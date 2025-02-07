import { QUESTION_TYPES } from "@/constants";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export type QuestionType = (typeof QUESTION_TYPES)[number];

export type Category =
  | "SCIENCE"
  | "MATH"
  | "HISTORY"
  | "GEOGRAPHY"
  | "LITERATURE"
  | "TECHNOLOGY"
  | "SPORTS"
  | "ART"
  | "LANGUAGE"
  | "GENERAL_KNOWLEDGE"
  | "POLITICS"
  | "ECONOMICS"
  | "PHILOSOPHY"
  | "PSYCHOLOGY"
  | "BIOLOGY"
  | "CHEMISTRY"
  | "PHYSICS"
  | "COMPUTER_SCIENCE"
  | "RELIGION"
  | "NATURE"
  | "EDUCATION";

export type LibrarySortOption =
  | "alphabetical"
  | "reverseAlphabetical"
  | "recentUpdate"
  | "recentCreate"
  | "oldestCreate"
  | "oldestUpdate";

export type SearchSortOption = "highestRated" | "mostRecent" | "mostPlayed";

export type ImageManagerTabsType = "upload" | "stockPhotos" | "giphyGIFS";

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
        items: true;
      };
    };
  };
}>;

export type QuizDetails = Prisma.QuizGetPayload<{
  include: {
    user: true;
    bookmarks: true | undefined;
    questions: {
      include: {
        items: true;
      };
    };
    ratings: true;
  };
}>;
export type QuizDetailsWithIsBookmark = QuizDetails & { isBookmark: boolean };

export type SearchQuiz = Prisma.QuizGetPayload<{
  include: {
    user: true;
    bookmarks: true | undefined;
    questions: true;
    ratings: true;
  };
}> 




export type BookmarkQuiz = Prisma.QuizGetPayload<{
  include: {
    user: true;
    questions: true;
    bookmarks: true | undefined;
    ratings: true;
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
        ratings: true;
      };
    };
  };
}>;

export type SettingsUser = Prisma.UserGetPayload<{}>;

export type UserProfile = Prisma.UserGetPayload<{
  include: {
    quizzes: {
      include: {
        user: true;
        bookmarks: true | undefined;
        questions: true;
        ratings: true;
      };
    };
  };
}>;

export type PlayQuizMode = "play" | "preview";

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
export type UnsplashImage = {
  id: "Dwu85P9SOIk";
  urls: {
    regular: "https://images.unsplash.com/photo-123?w=1080";
  };
  alt_description: "A beautiful mountain landscape";
};

export type GiphyGif = {
  id: string;
  title: string;
  url: string; // The URL of the GIF
  images: {
    original: {
      url: string; // The original size GIF URL
      width: string;
      height: string;
    };
    fixed_height: {
      url: string; // A smaller fixed height GIF URL
      width: string;
      height: string;
    };
    // Other size variations can be added here
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
