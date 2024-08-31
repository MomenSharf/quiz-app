import { QUESTION_TYPES } from "@/constants";
import { Folder, Question, Quiz, User } from "@prisma/client";

export type QuestionType = (typeof QUESTION_TYPES)[number];
export type updataQuiz = Pick<
  Quiz,
  | "title"
  | "description"
  | "imageUrl"
  | "difficulty"
  | "visibility"
  | "categories"
>;

export type QuizGalleryWithQuestionsCount = Pick<
  Quiz,
  | "id"
  | "title"
  | "difficulty"
  | "visibility"
  | "imageUrl"
  | "createdAt"
  | "updatedAt"
> & {
  _count: {
    questions: number;
  };
};
export type EditorQuiz = Pick<
  Quiz,
  | "id"
  | "title"
  | "description"
  | "categories"
  | "difficulty"
  | "visibility"
  | "imageUrl"
  | "createdAt"
  | "updatedAt"
> & {
  questions: Question[];
  user: User;
};

export type FolderGalleryWithQuizzesCount = Pick<
  Folder,
  "id" | "title" | "createdAt" | "updatedAt"
> & {
  _count: {
    quizzes: number;
  };
};

export type FolderPathSegment = {
  id: string;
  title: string;
};

export type UnsplashPhoto = {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at?: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any | null;
  topic_submissions: Record<string, any>;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string | null;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email?: string | null;
    };
  };
};
export type Photo = {
  src: string;
  srcSet?: string | string[];
  sizes?: string | string[];
  width: number;
  height: number;
  alt?: string;
  key?: string;
};

export type GiphyApiResponse = {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: {
    original: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    downsized: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    downsized_large: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    downsized_medium: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    downsized_small: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    downsized_still: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_height: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_height_downsampled: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_height_small: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_height_small_still: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_height_still: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_width: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_width_downsampled: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_width_small: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_width_small_still: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    fixed_width_still: {
      height: string;
      width: string;
      size?: string;
      url: string;
      mp4_size?: string;
      mp4?: string;
      webp_size?: string;
      webp?: string;
      frames?: string;
      hash?: string;
    };
    looping: {
      mp4: string;
    };
  };
};

