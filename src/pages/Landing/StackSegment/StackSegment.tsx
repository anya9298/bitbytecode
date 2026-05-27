import { useState, useId } from 'react';
import stackEdgesData from '../../../data/stack-edges.json';
import stackNodesData from '../../../data/stack-nodes.json';
import stackTechsData from '../../../data/stack-techs.json';
import type { StackEdgeData, StackNodeData, TechData } from '../../../data/types';
import styles from './StackSegment.module.css';

type Tech = TechData;
type NodeDef = StackNodeData;
type Edge = StackEdgeData;

const TECHS: Record<string, Tech> = Object.fromEntries(
  (stackTechsData as TechData[]).map((tech) => [tech.id, tech])
);

const NODES = stackNodesData as NodeDef[];
const EDGES = stackEdgesData as Edge[];

// ─── цвета узлов ─────────────────────────────────────────────────────────────

const COLOR: Record<NodeDef['color'], { fill: string; stroke: string; text: string; badge: string; badgeText: string; label: string }> = {
  front: { fill: 'rgba(59,130,246,0.12)',  stroke: 'rgba(59,130,246,0.45)',  text: '#93c5fd', badge: 'rgba(59,130,246,0.18)',  badgeText: '#60a5fa', label: 'Frontend'       },
  lang:  { fill: 'rgba(168,85,247,0.12)', stroke: 'rgba(168,85,247,0.45)', text: '#c4b5fd', badge: 'rgba(168,85,247,0.18)', badgeText: '#a78bfa', label: 'Языки'          },
  back:  { fill: 'rgba(34,197,94,0.10)',  stroke: 'rgba(34,197,94,0.40)',  text: '#86efac', badge: 'rgba(34,197,94,0.16)',  badgeText: '#4ade80', label: 'Backend'        },
  infra: { fill: 'rgba(251,191,36,0.10)', stroke: 'rgba(251,191,36,0.40)', text: '#fde68a', badge: 'rgba(251,191,36,0.16)', badgeText: '#fbbf24', label: 'Инфраструктура' },
  cross: { fill: 'rgba(239,68,68,0.10)',  stroke: 'rgba(239,68,68,0.40)',  text: '#fca5a5', badge: 'rgba(239,68,68,0.16)',  badgeText: '#f87171', label: 'Сквозное'       },
};

// ─── центр правого края узла (выход) и левого края (вход) ────────────────────

function exitX(n: NodeDef)  { return n.x + n.w; }       // правый край
function exitY(n: NodeDef)  { return n.y + n.h / 2; }   // по центру по Y
function entryX(n: NodeDef) { return n.x; }              // левый край
function entryY(n: NodeDef) { return n.y + n.h / 2; }

// Для вертикальных соединений (узел над / под другим в той же колонке):
function exitBottom(n: NodeDef)  { return { x: n.x + n.w / 2, y: n.y + n.h }; }
function entryTop(n: NodeDef)    { return { x: n.x + n.w / 2, y: n.y }; }

// Строит ломаную точек для polyline.
// Если source и target в одной вертикальной полосе (|cx разница < 20) — идём вертикально.
// Иначе: выходим вправо из source, делаем излом на середине X, заходим слева в target.
function buildPoints(src: NodeDef, dst: NodeDef): string {
  const srcCX = src.x + src.w / 2;
  const dstCX = dst.x + dst.w / 2;
  const sameCol = Math.abs(srcCX - dstCX) < 20;

  if (sameCol) {
    // вертикальное соединение — выход снизу, вход сверху
    const s = exitBottom(src);
    const d = entryTop(dst);
    return `${s.x},${s.y} ${d.x},${d.y}`;
  }

  // горизонтальное с одним изломом: правый край src → mid X → левый край dst
  const x1 = exitX(src),  y1 = exitY(src);
  const x2 = entryX(dst), y2 = entryY(dst);
  const mx = Math.round((x1 + x2) / 2);
  return `${x1},${y1} ${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

// ─── SVG-диаграмма ────────────────────────────────────────────────────────────

function ArchDiagram({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const markerId = useId().replace(/:/g, '');
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  // Набор id узлов, связанных с текущим hovered/active
  const focusId = hoverId ?? activeId;
  const connectedIds: Set<string> = new Set();
  if (focusId) {
    EDGES.forEach((e) => {
      if (e.from === focusId) connectedIds.add(e.to);
      if (e.to   === focusId) connectedIds.add(e.from);
    });
    connectedIds.add(focusId);
  }
  const hasFocus = connectedIds.size > 0;

  // Подсветка рёбер: ребро активно если оба конца в connectedIds
  const isEdgeHighlighted = (e: Edge) =>
    hasFocus && connectedIds.has(e.from) && connectedIds.has(e.to);

  const ZONE_LABELS = [
    { x: 90,  y: 30,  text: 'Frontend', color: COLOR.front.badgeText },
    { x: 265, y: 88,  text: 'Языки',    color: COLOR.lang.badgeText  },
    { x: 265, y: 250, text: 'Backend',  color: COLOR.back.badgeText  },
    { x: 430, y: 250, text: 'Данные',   color: COLOR.back.badgeText  },
    { x: 605, y: 30,  text: 'Инфра',    color: COLOR.infra.badgeText },
    { x: 605, y: 250, text: 'Сквозное', color: COLOR.cross.badgeText },
  ];

  return (
    <svg
      className={styles.svg}
      viewBox="0 0 700 580"
      role="img"
      aria-label="Архитектурная схема стека технологий"
    >
      <defs>
        {/* маркер для обычных рёбер */}
        <marker id={`arr-${markerId}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(100,116,139,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        {/* маркер для пунктирных рёбер */}
        <marker id={`arr-dash-${markerId}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(100,116,139,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        {/* маркер для подсвеченных рёбер */}
        <marker id={`arr-hi-${markerId}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(135,135,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* сетка зон */}
      <line x1="180" y1="40" x2="180" y2="545" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="345" y1="40" x2="345" y2="545" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="515" y1="40" x2="515" y2="545" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="20"  y1="255" x2="680" y2="255" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

      {/* подписи зон */}
      {ZONE_LABELS.map((z) => (
        <text key={z.text + z.x} x={z.x} y={z.y} textAnchor="middle"
          fontSize="11" fontWeight="600" fill={z.color} opacity="0.65"
          letterSpacing="0.06em" style={{ textTransform: 'uppercase', fontFamily: 'inherit' }}>
          {z.text}
        </text>
      ))}

      {/* ── рёбра (рисуются ДО узлов, чтобы узлы были поверх) ── */}
      {EDGES.map((e, i) => {
        const src = nodeMap[e.from];
        const dst = nodeMap[e.to];
        if (!src || !dst) return null;

        const highlighted = isEdgeHighlighted(e);
        const dimmed = hasFocus && !highlighted;
        const points = buildPoints(src, dst);

        return (
          <polyline
            key={i}
            points={points}
            fill="none"
            stroke={
              highlighted
                ? 'rgba(135,135,255,0.85)'
                : e.dashed
                ? 'rgba(100,116,139,0.22)'
                : 'rgba(100,116,139,0.38)'
            }
            strokeWidth={highlighted ? 1.5 : 1}
            strokeDasharray={e.dashed && !highlighted ? '4 4' : undefined}
            opacity={dimmed ? 0.15 : 1}
            markerEnd={`url(#${highlighted ? `arr-hi-${markerId}` : e.dashed ? `arr-dash-${markerId}` : `arr-${markerId}`})`}
            style={{ transition: 'opacity 0.15s, stroke 0.15s' }}
          />
        );
      })}

      {/* ── узлы (поверх рёбер) ── */}
      {NODES.map((node) => {
        const tech = TECHS[node.id];
        const c = COLOR[node.color];
        const isActive  = activeId === node.id;
        const isHovered = hoverId  === node.id;
        const dimmed    = hasFocus && !connectedIds.has(node.id);

        return (
          <g
            key={node.id}
            className={styles.svgNode}
            onClick={() => onSelect(node.id)}
            onMouseEnter={() => setHoverId(node.id)}
            onMouseLeave={() => setHoverId(null)}
            role="button"
            aria-label={tech.name}
            aria-pressed={isActive}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(node.id)}
            style={{ opacity: dimmed ? 0.25 : 1, transition: 'opacity 0.15s' }}
          >
            <rect
              x={node.x} y={node.y}
              width={node.w} height={node.h}
              rx="8"
              fill={
                isActive
                  ? c.stroke.replace('0.45', '0.28')
                  : isHovered
                  ? c.stroke.replace('0.45', '0.18')
                  : c.fill
              }
              stroke={
                isActive
                  ? c.stroke.replace('0.45', '1')
                  : isHovered
                  ? c.stroke.replace('0.45', '0.75')
                  : c.stroke
              }
              strokeWidth={isActive ? 1.5 : isHovered ? 1 : 0.75}
            />
            <text x={node.x + 12} y={node.y + node.h / 2} dominantBaseline="central" fontSize="14" style={{ fontFamily: 'inherit' }}>
              {tech.icon}
            </text>
            <text
              x={node.x + 32} y={node.y + node.h / 2 - 5}
              dominantBaseline="central"
              fontSize="11"
              fontWeight={isActive || isHovered ? '700' : '500'}
              fill={isActive || isHovered ? '#f1f5f9' : c.text}
              style={{ fontFamily: 'inherit' }}
            >
              {tech.name}
            </text>
            <text
              x={node.x + 32} y={node.y + node.h / 2 + 9}
              dominantBaseline="central"
              fontSize="9"
              fill={c.text}
              opacity="0.5"
              style={{ fontFamily: 'inherit' }}
            >
              {tech.tag}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── панель справа ────────────────────────────────────────────────────────────

function InfoPanel({ tech }: { tech: Tech | null }) {
  if (!tech) {
    return (
      <aside className={styles.infoPanel}>
        <div className={styles.infoEmpty}>
          <span className={styles.infoEmptyIcon}>↖</span>
          <p>Нажмите на любой узел схемы</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${styles.infoPanel} ${styles.infoPanelFilled}`}>
      <div className={styles.infoTop}>
        <span className={styles.infoIcon}>{tech.icon}</span>
        <div>
          <p className={styles.infoName}>{tech.name}</p>
          <p className={styles.infoTag}>{tech.tag}</p>
        </div>
      </div>

      <p className={styles.infoDesc}>{tech.desc}</p>

      <div className={styles.infoRoles}>
        {tech.roles.map((r) => (
          <span key={r} className={styles.rolePill}>{r}</span>
        ))}
      </div>

      <a
        className={styles.infoLink}
        href={tech.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Открыть документацию ↗
      </a>
    </aside>
  );
}

// ─── легенда ──────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div className={styles.legend}>
      {(Object.keys(COLOR) as Array<keyof typeof COLOR>).map((k) => (
        <div key={k} className={styles.legendItem}>
          <span
            className={styles.legendDot}
            style={{ background: COLOR[k].stroke, boxShadow: `0 0 6px ${COLOR[k].stroke}` }}
          />
          <span className={styles.legendText}>{COLOR[k].label}</span>
        </div>
      ))}
      <div className={styles.legendItem}>
        <svg width="24" height="12" style={{ flexShrink: 0 }}>
          <line x1="0" y1="6" x2="24" y2="6" stroke="rgba(100,116,139,0.5)" strokeWidth="1" strokeDasharray="4 3" />
        </svg>
        <span className={styles.legendText}>зависит от</span>
      </div>
    </div>
  );
}

// ─── главный компонент ────────────────────────────────────────────────────────

export const StackSegment = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeTech = activeId ? TECHS[activeId] ?? null : null;

  const handleSelect = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="stack" className={styles.root}>
      <div className={styles.inner}>

        <header className={styles.heading}>
          <h2 className={styles.title}>Стек разработки</h2>
          <p className={styles.subtitle}>
            Архитектура приложений — от интерфейса до сервера
          </p>
        </header>

        <Legend />

        <div className={styles.layout}>
          <div className={styles.diagramWrap}>
            <ArchDiagram activeId={activeId} onSelect={handleSelect} />
          </div>
          <InfoPanel tech={activeTech} />
        </div>

      </div>
    </section>
  );
};