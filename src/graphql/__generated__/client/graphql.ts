/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Album = {
  __typename?: 'Album';
  animations: Array<Maybe<Animation>>;
  artists: Array<Maybe<Artist>>;
  avgRating: AvgRating;
  categories: Array<Maybe<Category>>;
  classifications: Array<Maybe<Classification>>;
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discs: Array<Maybe<Disc>>;
  downloads: Array<Maybe<Download>>;
  favorites: Scalars['Int']['output'];
  games: Array<Maybe<Game>>;
  headerColor: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isFavorite?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  placeholder?: Maybe<Scalars['String']['output']>;
  platforms: Array<Maybe<Platform>>;
  related: Array<Maybe<Album>>;
  releaseDate: Scalars['String']['output'];
  selfComment?: Maybe<Comment>;
  selfScore?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  stores: Array<Maybe<Store>>;
  subTitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  vgmdb?: Maybe<Scalars['String']['output']>;
};

export type Animation = {
  __typename?: 'Animation';
  albums: Array<Maybe<Album>>;
  headerColor: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  placeholder?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  studios: Array<Maybe<Studio>>;
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type AnimationAlbumsArgs = {
  order?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Artist = {
  __typename?: 'Artist';
  albums?: Maybe<Array<Maybe<Album>>>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type ArtistInput = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type AvgRating = {
  __typename?: 'AvgRating';
  score: Scalars['Float']['output'];
  users: Scalars['Int']['output'];
};

export type Category = {
  __typename?: 'Category';
  albums: Array<Maybe<Album>>;
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Classification = {
  __typename?: 'Classification';
  name: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  album: Album;
  anon: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type Config = {
  __typename?: 'Config';
  name: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type Disc = {
  __typename?: 'Disc';
  album?: Maybe<Album>;
  body?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  tracks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type DiscInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
};

export type Download = {
  __typename?: 'Download';
  id: Scalars['ID']['output'];
  links?: Maybe<Array<Maybe<Link>>>;
  small?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type DownloadInput = {
  links?: InputMaybe<Array<InputMaybe<LinkInput>>>;
  small?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Game = {
  __typename?: 'Game';
  albums?: Maybe<Array<Maybe<Album>>>;
  headerColor: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  placeholder?: Maybe<Scalars['String']['output']>;
  platforms?: Maybe<Array<Maybe<Platform>>>;
  publishers?: Maybe<Array<Maybe<Publisher>>>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  series?: Maybe<Array<Maybe<Series>>>;
  slug: Scalars['String']['output'];
};


export type GameAlbumsArgs = {
  order?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Link = {
  __typename?: 'Link';
  custom?: Maybe<Scalars['String']['output']>;
  directUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type LinkInput = {
  custom?: InputMaybe<Scalars['String']['input']>;
  directUrl?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite?: Maybe<Scalars['Boolean']['output']>;
  config: Config;
  createAlbum: Album;
  createAnimation?: Maybe<Animation>;
  createForgorLink: Scalars['Boolean']['output'];
  createGame: Game;
  createPlatform: Platform;
  createPublisher: Publisher;
  createRole?: Maybe<Role>;
  createSeries: Series;
  createStudio: Studio;
  deleteAlbum?: Maybe<Scalars['Int']['output']>;
  deleteAnimation?: Maybe<Scalars['Int']['output']>;
  deleteGame?: Maybe<Scalars['Int']['output']>;
  deletePlatform?: Maybe<Scalars['Int']['output']>;
  deletePublisher?: Maybe<Scalars['Int']['output']>;
  deleteRole?: Maybe<Scalars['String']['output']>;
  deleteSeries?: Maybe<Scalars['Int']['output']>;
  deleteStudio?: Maybe<Scalars['Int']['output']>;
  deleteUser?: Maybe<Scalars['Int']['output']>;
  editRequest: Request;
  login: Scalars['Int']['output'];
  logout: Scalars['Int']['output'];
  rateAlbum?: Maybe<Scalars['Boolean']['output']>;
  registerUser: Scalars['Boolean']['output'];
  rejectRequest: Scalars['Boolean']['output'];
  removeFavorite?: Maybe<Scalars['Boolean']['output']>;
  selectBanner?: Maybe<Scalars['Int']['output']>;
  submitAlbum: Submission;
  updateAlbum: Album;
  updateAnimation?: Maybe<Animation>;
  updateComment?: Maybe<Scalars['Boolean']['output']>;
  updateGame: Game;
  updatePass: Scalars['Boolean']['output'];
  updatePlatform: Platform;
  updatePublisher: Publisher;
  updateRole?: Maybe<Role>;
  updateSeries: Series;
  updateStudio: Studio;
  updateUser: Scalars['Boolean']['output'];
  updateUserRoles: Scalars['Boolean']['output'];
  uploadBanner?: Maybe<Scalars['Int']['output']>;
};


export type MutationAddFavoriteArgs = {
  albumId: Scalars['String']['input'];
};


export type MutationConfigArgs = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type MutationCreateAlbumArgs = {
  animations?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  artists?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  classifications?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cover?: InputMaybe<Scalars['Upload']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discs?: InputMaybe<Array<InputMaybe<DiscInput>>>;
  downloads?: InputMaybe<Array<InputMaybe<DownloadInput>>>;
  games?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label?: InputMaybe<Scalars['String']['input']>;
  platforms?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  request?: InputMaybe<Scalars['ID']['input']>;
  status: Scalars['String']['input'];
  stores?: InputMaybe<Array<InputMaybe<StoreInput>>>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  vgmdb?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateAnimationArgs = {
  cover?: InputMaybe<Scalars['Upload']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  studios?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateForgorLinkArgs = {
  key: Scalars['String']['input'];
};


export type MutationCreateGameArgs = {
  cover: Scalars['Upload']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  platforms?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishers?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  series?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreatePlatformArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationCreatePublisherArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateRoleArgs = {
  name: Scalars['String']['input'];
  permissions: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationCreateSeriesArgs = {
  cover: Scalars['Upload']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateStudioArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteAlbumArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAnimationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteGameArgs = {
  slug: Scalars['String']['input'];
};


export type MutationDeletePlatformArgs = {
  key: Scalars['ID']['input'];
};


export type MutationDeletePublisherArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoleArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteSeriesArgs = {
  slug: Scalars['String']['input'];
};


export type MutationDeleteStudioArgs = {
  slug: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  username: Scalars['String']['input'];
};


export type MutationEditRequestArgs = {
  comments?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRateAlbumArgs = {
  albumId: Scalars['ID']['input'];
  score: Scalars['Int']['input'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String']['input'];
  pfp?: InputMaybe<Scalars['Upload']['input']>;
  username: Scalars['String']['input'];
};


export type MutationRejectRequestArgs = {
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveFavoriteArgs = {
  albumId: Scalars['String']['input'];
};


export type MutationSelectBannerArgs = {
  name: Scalars['String']['input'];
};


export type MutationSubmitAlbumArgs = {
  links: Scalars['String']['input'];
  request?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  vgmdb?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateAlbumArgs = {
  animations?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  artists?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  classifications?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cover?: InputMaybe<Scalars['Upload']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discs?: InputMaybe<Array<InputMaybe<DiscInput>>>;
  downloads?: InputMaybe<Array<InputMaybe<DownloadInput>>>;
  games?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  platforms?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  request?: InputMaybe<Scalars['ID']['input']>;
  status: Scalars['String']['input'];
  stores?: InputMaybe<Array<InputMaybe<StoreInput>>>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  vgmdb?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateAnimationArgs = {
  cover?: InputMaybe<Scalars['Upload']['input']>;
  id: Scalars['ID']['input'];
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  studios?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCommentArgs = {
  albumId: Scalars['ID']['input'];
  anon: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
};


export type MutationUpdateGameArgs = {
  cover?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  platforms?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishers?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  series?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePassArgs = {
  key: Scalars['String']['input'];
  pass: Scalars['String']['input'];
};


export type MutationUpdatePlatformArgs = {
  key: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationUpdatePublisherArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateRoleArgs = {
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
  permissions: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationUpdateSeriesArgs = {
  cover?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateStudioArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  pfp?: InputMaybe<Scalars['Upload']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserRolesArgs = {
  roles: Array<InputMaybe<Scalars['String']['input']>>;
  username: Scalars['String']['input'];
};


export type MutationUploadBannerArgs = {
  banner: Scalars['Upload']['input'];
};

export type Page = {
  __typename?: 'Page';
  perms: Array<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Platform = {
  __typename?: 'Platform';
  albums?: Maybe<Array<Maybe<Album>>>;
  games: Array<Maybe<Game>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type Publisher = {
  __typename?: 'Publisher';
  games?: Maybe<Array<Maybe<Game>>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  album?: Maybe<Album>;
  albumCount: Scalars['Float']['output'];
  albums: Array<Album>;
  animation: Animation;
  animations: Array<Maybe<Animation>>;
  artists: Array<Artist>;
  banners: Array<Maybe<Scalars['String']['output']>>;
  categories: Array<Maybe<Category>>;
  classifications: Array<Maybe<Classification>>;
  config?: Maybe<Config>;
  downloads: Array<Maybe<Download>>;
  game: Game;
  games: Array<Game>;
  getRandomAlbum: Array<Album>;
  highlight: Album;
  login: Scalars['Int']['output'];
  me?: Maybe<UserMe>;
  permissions: Array<Maybe<Scalars['String']['output']>>;
  platform: Platform;
  platforms: Array<Platform>;
  publisher: Publisher;
  publishers: Array<Maybe<Publisher>>;
  recentComments: Array<Maybe<Comment>>;
  recentPlatforms?: Maybe<Array<Maybe<Platform>>>;
  recentPublishers?: Maybe<Array<Maybe<Publisher>>>;
  recentSeries?: Maybe<Array<Maybe<Series>>>;
  request?: Maybe<Request>;
  requests: Array<Maybe<Request>>;
  roles: Array<Maybe<Role>>;
  searchAlbum?: Maybe<SearchAlbumResult>;
  searchAlbumByArtist?: Maybe<SearchAlbumResult>;
  searchAnimation?: Maybe<SearchAnimResult>;
  searchGame?: Maybe<SearchGameResult>;
  searchPlatformsByCategories: Array<Maybe<Platform>>;
  searchPlatformsByName?: Maybe<Array<Maybe<Platform>>>;
  searchPublishersByName?: Maybe<Array<Maybe<Publisher>>>;
  searchRequests: RequestResult;
  searchSeries?: Maybe<SearchSeriesResult>;
  searchSeriesByName?: Maybe<Array<Maybe<Series>>>;
  searchStudio?: Maybe<SearchStudioResult>;
  series: Array<Maybe<Series>>;
  seriesOne?: Maybe<Series>;
  studio: Studio;
  studios: Array<Maybe<Studio>>;
  submissions: Array<Maybe<Submission>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
  vgmdb?: Maybe<VgmResult>;
};


export type QueryAlbumArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAnimationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryConfigArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDownloadsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGameArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetRandomAlbumArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryPlatformArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPublisherArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRecentCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecentPlatformsArgs = {
  limit: Scalars['Int']['input'];
  type: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QueryRecentPublishersArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryRecentSeriesArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryRequestArgs = {
  link: Scalars['String']['input'];
};


export type QueryRequestsArgs = {
  donator: Array<InputMaybe<Scalars['Boolean']['input']>>;
  state?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QuerySearchAlbumArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchAlbumByArtistArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  order?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QuerySearchAnimationArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchGameArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchPlatformsByCategoriesArgs = {
  categories: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QuerySearchPlatformsByNameArgs = {
  categories: Array<InputMaybe<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchPublishersByNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchRequestsArgs = {
  donator?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QuerySearchSeriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchSeriesByNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchStudioArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeriesOneArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStudioArgs = {
  slug: Scalars['String']['input'];
};


export type QuerySubmissionsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVgmdbArgs = {
  url: Scalars['String']['input'];
};

export type Request = {
  __typename?: 'Request';
  comments?: Maybe<Scalars['String']['output']>;
  donator: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['String']['output']>;
  userID?: Maybe<Scalars['String']['output']>;
};

export type RequestResult = {
  __typename?: 'RequestResult';
  count: Scalars['Int']['output'];
  rows: Array<Maybe<Request>>;
};

export type Role = {
  __typename?: 'Role';
  name: Scalars['String']['output'];
  permissions: Array<Maybe<Scalars['String']['output']>>;
};

export type SearchAlbumResult = {
  __typename?: 'SearchAlbumResult';
  count?: Maybe<Scalars['Int']['output']>;
  rows?: Maybe<Array<Maybe<Album>>>;
};

export type SearchAnimResult = {
  __typename?: 'SearchAnimResult';
  count?: Maybe<Scalars['Int']['output']>;
  rows?: Maybe<Array<Maybe<Animation>>>;
};

export type SearchGameResult = {
  __typename?: 'SearchGameResult';
  count?: Maybe<Scalars['Int']['output']>;
  rows?: Maybe<Array<Maybe<Game>>>;
};

export type SearchSeriesResult = {
  __typename?: 'SearchSeriesResult';
  count?: Maybe<Scalars['Int']['output']>;
  rows?: Maybe<Array<Maybe<Series>>>;
};

export type SearchStudioResult = {
  __typename?: 'SearchStudioResult';
  count?: Maybe<Scalars['Int']['output']>;
  rows?: Maybe<Array<Maybe<Studio>>>;
};

export type Series = {
  __typename?: 'Series';
  games?: Maybe<Array<Maybe<Game>>>;
  headerColor: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  placeholder?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

export type Store = {
  __typename?: 'Store';
  id: Scalars['ID']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type StoreInput = {
  provider: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Studio = {
  __typename?: 'Studio';
  animations: Array<Maybe<Animation>>;
  name?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

export type Submission = {
  __typename?: 'Submission';
  id: Scalars['ID']['output'];
  links?: Maybe<Scalars['String']['output']>;
  request?: Maybe<Request>;
  score: Scalars['Int']['output'];
  state: Scalars['String']['output'];
  submitter: User;
  title: Scalars['String']['output'];
  vgmdb?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['Float']['output'];
  favorites: Array<Maybe<Album>>;
  imgUrl: Scalars['String']['output'];
  pages: Array<Maybe<Page>>;
  permissions: Array<Maybe<Scalars['String']['output']>>;
  roles: Array<Maybe<Role>>;
  username: Scalars['String']['output'];
};

export type UserMe = {
  __typename?: 'UserMe';
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  favorites: Array<Maybe<Album>>;
  imgUrl: Scalars['String']['output'];
  pages: Array<Maybe<Page>>;
  permissions: Array<Maybe<Scalars['String']['output']>>;
  roles: Array<Maybe<Role>>;
  username: Scalars['String']['output'];
};

export type VgmdbDisc = {
  __typename?: 'VGMDBDisc';
  number?: Maybe<Scalars['Int']['output']>;
  tracks?: Maybe<Array<Scalars['String']['output']>>;
};

export type VgmResult = {
  __typename?: 'VgmResult';
  artists: Array<Maybe<Scalars['String']['output']>>;
  categories: Array<Maybe<Scalars['String']['output']>>;
  classifications: Array<Maybe<Scalars['String']['output']>>;
  coverUrl?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  trackList: Array<Maybe<VgmdbDisc>>;
};
