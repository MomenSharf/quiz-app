import { QUESTION_TYPES } from "@/constants";
import { Prisma } from "@prisma/client";

export type QuestionType = (typeof QUESTION_TYPES)[number];

export type SortOption =
  | "alphabetical"
  | "reverseAlphabetical"
  | "recentUpdate"
  | "recentCreate"
  | "oldestCreate"
  | "oldestUpdate";

export type DashboardQuiz = Prisma.QuizGetPayload<{
  include: {
    _count: {
      select: {
        questions: true;
      };
    };
  };
}>;
export type DashboardFoldersWithQuiz = Prisma.FolderGetPayload<{
  include: {
    _count: {
      select: {
        quizzes: true;
        subfolders: true;
      };
    };
  };
}>;
export type DashboardFolder = Prisma.FolderGetPayload<{
  include: {
    _count: {
      select: {
        quizzes: true;
      };
    };
    quizzes: {
      include: {
        _count: {
          select: {
            questions: true;
          };
        };
      };
    };
    subfolders: {
      include: {
        _count: {
          select: {
            subfolders: true;
            quizzes: true;
          };
        };
      };
    };
  };
}>;
export type FolderPathSegment = {
  id: string;
  title: string;
};

export type EditorQuiz = Prisma.QuizGetPayload<{
  include: {
    questions: {
      include: {
        items: true,
      },
    },
  }
}>

export type QuizDetails = Prisma.QuizGetPayload<{
  include: {
    user: true,
    image: true,
    questions: {
      include: {
        image: true,
        _count: true,
        items: true,
      },
    },
  },
}>




export type EditorQuiz2 = Prisma.QuizGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    image: true;
    visibility: true;
    categories: true;
    createdAt: true;
    updatedAt: true;
    questions: {
      include: {
        image: true;
        items: true;
      };
    };
    user: true;
    rates: true;
  };
}>;
export type PlayQuizType = Prisma.QuizProgressGetPayload<{
  include: {
    quiz: {
      include: {
        questions: {
          include: {
            items: true;
          };
        };
        rates: true;
      };
    };
    user: true;
  };
}>;

export type SettingsUser = Prisma.UserGetPayload<{}>;



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
