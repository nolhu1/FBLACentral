export type UserRole = 'member' | 'chapter_officer' | 'state_admin' | 'national_admin';

export type UserProfile = {
  id: string;
  name: string;
  chapterId: string;
  state: string;
  gradYear: number;
  role: UserRole;
  interests: string[];
  photoURL?: string;
  onboardingComplete: boolean;   // ← add this
};

export type NotificationPrefs = {
  announcements: boolean;
  events: boolean;
  resources: boolean;
  quietHours: { start: string; end: string } | null; // "HH:mm"
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  startTimeISO: string;
  endTimeISO: string;
  level: 'chapter' | 'district' | 'state' | 'national';
  category: string;
  location?: string;
};

export type AnnouncementItem = {
  id: string;
  title: string;
  body: string;
  scope: 'chapter' | 'state' | 'national';
  pinned: boolean;
  createdAtISO: string;
};

export type ResourceItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  docType: 'pdf' | 'link' | 'text';
  url?: string;
  tags: string[];
};

export type Chapter = {
  id: string;
  name: string;
  schoolName: string;
  state: string;
  socialLinks: Partial<{
    instagram: string;
    tiktok: string;
    youtube: string;
    x: string;
    facebook: string;
    website: string;
  }>;
};