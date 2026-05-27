export type ProjectLinkData = {
  label: string;
  href: string;
};

export type ProjectData = {
  id: string;
  title: string;
  tagline: string;
  typeTag: string;
  developers: string[];
  leader?: string;
  paragraphs: string[];
  employeeBenefits?: string[];
  hrBenefits?: string[];
  links?: ProjectLinkData[];
  logoKey?: string;
  featured?: boolean;
  relatedTo?: string;
};

export type CourseData = {
  id: string;
  title: string;
  levelTag: string;
  duration: string;
  schedule: string;
  candidateRequirements: string;
  topics: string[];
  finalProject: string;
  admission?: string;
  note?: string;
};

export type CoursesFileData = {
  ageRangeText: string;
  courses: CourseData[];
};

export type TechData = {
  id: string;
  icon: string;
  name: string;
  tag: string;
  desc: string;
  url: string;
  roles: string[];
};

export type StackNodeData = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: 'front' | 'lang' | 'back' | 'infra' | 'cross';
};

export type StackEdgeData = {
  from: string;
  to: string;
  dashed?: boolean;
};

export type NavItemData = {
  href: string;
  label: string;
};

export type ContentSectionData = {
  id: string;
  title: string;
  paragraphs: string[];
  badge?: string;
};

export type EduProcessSectionData = ContentSectionData;

export type ContentSectionsFileData = {
  title: string;
  subtitle: string;
  sections: ContentSectionData[];
};

export type EduProcessFileData = ContentSectionsFileData;
export type TechEquipmentFileData = ContentSectionsFileData;

export type HighlightData = {
  icon: string;
  title: string;
  text: string;
};

export type ExternalLinkData = {
  label: string;
  href: string;
};

export type SamsungSchoolFileData = {
  title: string;
  subtitle: string;
  highlights: HighlightData[];
  paragraphs: string[];
  callout: string;
  websiteLink: ExternalLinkData;
};

export type ItcubeFileData = {
  photoUrl: string;
  name: string;
  title: string;
  subtitle: string;
  leadTitle: string;
  leadParagraphs: string[];
  highlights: HighlightData[];
  paragraphs: string[];
  coursesNote: string;
  enrollmentText: string;
  websiteLink: ExternalLinkData;
  mapEmbedUrl: string;
  address: string;
};

export type EducationItemData = {
  institution: string;
  duration: string;
  code: string;
  specialty: string;
};

export type TeacherContactsFileData = {
  title: string;
  subtitle: string;
  photoUrl: string;
  name: string;
  role: string;
  teachingStartDate: string;
  totalExperienceNote: string;
  education: EducationItemData[];
  paragraphs: string[];
  focusTitle: string;
  focusText: string;
  email: string;
};
