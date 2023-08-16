export interface IShow {
  show_id: number;
  name: string;
}

export interface IEpisode {
  episode_id: number;
  title: string;
  description: string;
  youtube_video_id: string;
}

export interface ICueIndex {
  caption_id: number;
  show_id: number;
  episode_id: number;
  start_time: number;
  end_time: number;
  caption: string;
}

export interface ICueJson {
  show_id: number;
  episode_id: number;
  cues: ICueJsonItem[];
}

export interface ICueJsonItem {
  caption: string;
  start_time: number;
  end_time: number;
}

export interface ISearchProps {
  query: string | undefined;
  cues: ICueIndex[] | undefined;
  episodes: IEpisode[] | undefined;
  shows: IShow[] | undefined;
}
