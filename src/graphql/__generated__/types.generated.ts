// @ts-nocheck
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ResolverContext } from '../client.mts';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  JSONObject: { input: Record<string, any>; output: Record<string, any>; }
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


export type AnimationalbumsArgs = {
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


export type GamealbumsArgs = {
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


export type MutationaddFavoriteArgs = {
  albumId: Scalars['String']['input'];
};


export type MutationconfigArgs = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type MutationcreateAlbumArgs = {
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


export type MutationcreateAnimationArgs = {
  cover?: InputMaybe<Scalars['Upload']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  studios?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationcreateForgorLinkArgs = {
  key: Scalars['String']['input'];
};


export type MutationcreateGameArgs = {
  cover: Scalars['Upload']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  platforms?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishers?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  series?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationcreatePlatformArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationcreatePublisherArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationcreateRoleArgs = {
  name: Scalars['String']['input'];
  permissions: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationcreateSeriesArgs = {
  cover: Scalars['Upload']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationcreateStudioArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationdeleteAlbumArgs = {
  id: Scalars['ID']['input'];
};


export type MutationdeleteAnimationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationdeleteGameArgs = {
  slug: Scalars['String']['input'];
};


export type MutationdeletePlatformArgs = {
  key: Scalars['ID']['input'];
};


export type MutationdeletePublisherArgs = {
  id: Scalars['ID']['input'];
};


export type MutationdeleteRoleArgs = {
  name: Scalars['String']['input'];
};


export type MutationdeleteSeriesArgs = {
  slug: Scalars['String']['input'];
};


export type MutationdeleteStudioArgs = {
  slug: Scalars['String']['input'];
};


export type MutationdeleteUserArgs = {
  username: Scalars['String']['input'];
};


export type MutationeditRequestArgs = {
  comments?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationloginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationrateAlbumArgs = {
  albumId: Scalars['ID']['input'];
  score: Scalars['Int']['input'];
};


export type MutationregisterUserArgs = {
  email: Scalars['String']['input'];
  pfp?: InputMaybe<Scalars['Upload']['input']>;
  username: Scalars['String']['input'];
};


export type MutationrejectRequestArgs = {
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationremoveFavoriteArgs = {
  albumId: Scalars['String']['input'];
};


export type MutationselectBannerArgs = {
  name: Scalars['String']['input'];
};


export type MutationsubmitAlbumArgs = {
  links: Scalars['String']['input'];
  request?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  vgmdb?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateAlbumArgs = {
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


export type MutationupdateAnimationArgs = {
  cover?: InputMaybe<Scalars['Upload']['input']>;
  id: Scalars['ID']['input'];
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  studios?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateCommentArgs = {
  albumId: Scalars['ID']['input'];
  anon: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
};


export type MutationupdateGameArgs = {
  cover?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  platforms?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishers?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  series?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdatePassArgs = {
  key: Scalars['String']['input'];
  pass: Scalars['String']['input'];
};


export type MutationupdatePlatformArgs = {
  key: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationupdatePublisherArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateRoleArgs = {
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
  permissions: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationupdateSeriesArgs = {
  cover?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateStudioArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  pfp?: InputMaybe<Scalars['Upload']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationupdateUserRolesArgs = {
  roles: Array<InputMaybe<Scalars['String']['input']>>;
  username: Scalars['String']['input'];
};


export type MutationuploadBannerArgs = {
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


export type QueryalbumArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryanimationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryconfigArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QuerydownloadsArgs = {
  id: Scalars['ID']['input'];
};


export type QuerygameArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QuerygetRandomAlbumArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryloginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryplatformArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerypublisherArgs = {
  id: Scalars['ID']['input'];
};


export type QueryrecentCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryrecentPlatformsArgs = {
  limit: Scalars['Int']['input'];
  type: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QueryrecentPublishersArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryrecentSeriesArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryrequestArgs = {
  link: Scalars['String']['input'];
};


export type QueryrequestsArgs = {
  donator: Array<InputMaybe<Scalars['Boolean']['input']>>;
  state?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QuerysearchAlbumArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QuerysearchAlbumByArtistArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  order?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QuerysearchAnimationArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QuerysearchGameArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerysearchPlatformsByCategoriesArgs = {
  categories: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QuerysearchPlatformsByNameArgs = {
  categories: Array<InputMaybe<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QuerysearchPublishersByNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QuerysearchRequestsArgs = {
  donator?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QuerysearchSeriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerysearchSeriesByNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QuerysearchStudioArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryseriesOneArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QuerystudioArgs = {
  slug: Scalars['String']['input'];
};


export type QuerysubmissionsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryuserArgs = {
  username: Scalars['String']['input'];
};


export type QueryusersArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryvgmdbArgs = {
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

export type VGMDBDisc = {
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
  trackList: Array<Maybe<VGMDBDisc>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Album: ResolverTypeWrapper<Album>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Animation: ResolverTypeWrapper<Animation>;
  Artist: ResolverTypeWrapper<Artist>;
  ArtistInput: ArtistInput;
  AvgRating: ResolverTypeWrapper<AvgRating>;
  Category: ResolverTypeWrapper<Category>;
  Classification: ResolverTypeWrapper<Classification>;
  Comment: ResolverTypeWrapper<Comment>;
  Config: ResolverTypeWrapper<Config>;
  Disc: ResolverTypeWrapper<Disc>;
  DiscInput: DiscInput;
  Download: ResolverTypeWrapper<Download>;
  DownloadInput: DownloadInput;
  Game: ResolverTypeWrapper<Game>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  Link: ResolverTypeWrapper<Link>;
  LinkInput: LinkInput;
  Mutation: ResolverTypeWrapper<{}>;
  Page: ResolverTypeWrapper<Page>;
  Platform: ResolverTypeWrapper<Platform>;
  Publisher: ResolverTypeWrapper<Publisher>;
  Query: ResolverTypeWrapper<{}>;
  Request: ResolverTypeWrapper<Request>;
  RequestResult: ResolverTypeWrapper<RequestResult>;
  Role: ResolverTypeWrapper<Role>;
  SearchAlbumResult: ResolverTypeWrapper<SearchAlbumResult>;
  SearchAnimResult: ResolverTypeWrapper<SearchAnimResult>;
  SearchGameResult: ResolverTypeWrapper<SearchGameResult>;
  SearchSeriesResult: ResolverTypeWrapper<SearchSeriesResult>;
  SearchStudioResult: ResolverTypeWrapper<SearchStudioResult>;
  Series: ResolverTypeWrapper<Series>;
  Store: ResolverTypeWrapper<Store>;
  StoreInput: StoreInput;
  Studio: ResolverTypeWrapper<Studio>;
  Submission: ResolverTypeWrapper<Submission>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserMe: ResolverTypeWrapper<UserMe>;
  VGMDBDisc: ResolverTypeWrapper<VGMDBDisc>;
  VgmResult: ResolverTypeWrapper<VgmResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Album: Album;
  Float: Scalars['Float']['output'];
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  ID: Scalars['ID']['output'];
  Boolean: Scalars['Boolean']['output'];
  Animation: Animation;
  Artist: Artist;
  ArtistInput: ArtistInput;
  AvgRating: AvgRating;
  Category: Category;
  Classification: Classification;
  Comment: Comment;
  Config: Config;
  Disc: Disc;
  DiscInput: DiscInput;
  Download: Download;
  DownloadInput: DownloadInput;
  Game: Game;
  JSON: Scalars['JSON']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  Link: Link;
  LinkInput: LinkInput;
  Mutation: {};
  Page: Page;
  Platform: Platform;
  Publisher: Publisher;
  Query: {};
  Request: Request;
  RequestResult: RequestResult;
  Role: Role;
  SearchAlbumResult: SearchAlbumResult;
  SearchAnimResult: SearchAnimResult;
  SearchGameResult: SearchGameResult;
  SearchSeriesResult: SearchSeriesResult;
  SearchStudioResult: SearchStudioResult;
  Series: Series;
  Store: Store;
  StoreInput: StoreInput;
  Studio: Studio;
  Submission: Submission;
  Upload: Scalars['Upload']['output'];
  User: User;
  UserMe: UserMe;
  VGMDBDisc: VGMDBDisc;
  VgmResult: VgmResult;
};

export type AlbumResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']> = {
  animations?: Resolver<Array<Maybe<ResolversTypes['Animation']>>, ParentType, ContextType>;
  artists?: Resolver<Array<Maybe<ResolversTypes['Artist']>>, ParentType, ContextType>;
  avgRating?: Resolver<ResolversTypes['AvgRating'], ParentType, ContextType>;
  categories?: Resolver<Array<Maybe<ResolversTypes['Category']>>, ParentType, ContextType>;
  classifications?: Resolver<Array<Maybe<ResolversTypes['Classification']>>, ParentType, ContextType>;
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discs?: Resolver<Array<Maybe<ResolversTypes['Disc']>>, ParentType, ContextType>;
  downloads?: Resolver<Array<Maybe<ResolversTypes['Download']>>, ParentType, ContextType>;
  favorites?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  games?: Resolver<Array<Maybe<ResolversTypes['Game']>>, ParentType, ContextType>;
  headerColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeholder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  platforms?: Resolver<Array<Maybe<ResolversTypes['Platform']>>, ParentType, ContextType>;
  related?: Resolver<Array<Maybe<ResolversTypes['Album']>>, ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  selfComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  selfScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stores?: Resolver<Array<Maybe<ResolversTypes['Store']>>, ParentType, ContextType>;
  subTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  vgmdb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnimationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Animation'] = ResolversParentTypes['Animation']> = {
  albums?: Resolver<Array<Maybe<ResolversTypes['Album']>>, ParentType, ContextType, Partial<AnimationalbumsArgs>>;
  headerColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  placeholder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studios?: Resolver<Array<Maybe<ResolversTypes['Studio']>>, ParentType, ContextType>;
  subTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
  albums?: Resolver<Maybe<Array<Maybe<ResolversTypes['Album']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvgRatingResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['AvgRating'] = ResolversParentTypes['AvgRating']> = {
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  users?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  albums?: Resolver<Array<Maybe<ResolversTypes['Album']>>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassificationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Classification'] = ResolversParentTypes['Classification']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  album?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  anon?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Config'] = ResolversParentTypes['Config']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Disc'] = ResolversParentTypes['Disc']> = {
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tracks?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DownloadResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Download'] = ResolversParentTypes['Download']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  links?: Resolver<Maybe<Array<Maybe<ResolversTypes['Link']>>>, ParentType, ContextType>;
  small?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  albums?: Resolver<Maybe<Array<Maybe<ResolversTypes['Album']>>>, ParentType, ContextType, Partial<GamealbumsArgs>>;
  headerColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeholder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  platforms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Platform']>>>, ParentType, ContextType>;
  publishers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Publisher']>>>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  series?: Resolver<Maybe<Array<Maybe<ResolversTypes['Series']>>>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JSONObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type LinkResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
  custom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  directUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationaddFavoriteArgs, 'albumId'>>;
  config?: Resolver<ResolversTypes['Config'], ParentType, ContextType, RequireFields<MutationconfigArgs, 'name' | 'value'>>;
  createAlbum?: Resolver<ResolversTypes['Album'], ParentType, ContextType, RequireFields<MutationcreateAlbumArgs, 'status'>>;
  createAnimation?: Resolver<Maybe<ResolversTypes['Animation']>, ParentType, ContextType, Partial<MutationcreateAnimationArgs>>;
  createForgorLink?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationcreateForgorLinkArgs, 'key'>>;
  createGame?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<MutationcreateGameArgs, 'cover'>>;
  createPlatform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType, RequireFields<MutationcreatePlatformArgs, 'type'>>;
  createPublisher?: Resolver<ResolversTypes['Publisher'], ParentType, ContextType, Partial<MutationcreatePublisherArgs>>;
  createRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<MutationcreateRoleArgs, 'name' | 'permissions'>>;
  createSeries?: Resolver<ResolversTypes['Series'], ParentType, ContextType, RequireFields<MutationcreateSeriesArgs, 'cover'>>;
  createStudio?: Resolver<ResolversTypes['Studio'], ParentType, ContextType, Partial<MutationcreateStudioArgs>>;
  deleteAlbum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationdeleteAlbumArgs, 'id'>>;
  deleteAnimation?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationdeleteAnimationArgs, 'id'>>;
  deleteGame?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationdeleteGameArgs, 'slug'>>;
  deletePlatform?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationdeletePlatformArgs, 'key'>>;
  deletePublisher?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationdeletePublisherArgs, 'id'>>;
  deleteRole?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationdeleteRoleArgs, 'name'>>;
  deleteSeries?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationdeleteSeriesArgs, 'slug'>>;
  deleteStudio?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationdeleteStudioArgs, 'slug'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationdeleteUserArgs, 'username'>>;
  editRequest?: Resolver<ResolversTypes['Request'], ParentType, ContextType, RequireFields<MutationeditRequestArgs, 'id'>>;
  login?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationloginArgs, 'password' | 'username'>>;
  logout?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rateAlbum?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationrateAlbumArgs, 'albumId' | 'score'>>;
  registerUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationregisterUserArgs, 'email' | 'username'>>;
  rejectRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationrejectRequestArgs, 'id'>>;
  removeFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationremoveFavoriteArgs, 'albumId'>>;
  selectBanner?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationselectBannerArgs, 'name'>>;
  submitAlbum?: Resolver<ResolversTypes['Submission'], ParentType, ContextType, RequireFields<MutationsubmitAlbumArgs, 'links' | 'title'>>;
  updateAlbum?: Resolver<ResolversTypes['Album'], ParentType, ContextType, RequireFields<MutationupdateAlbumArgs, 'id' | 'status'>>;
  updateAnimation?: Resolver<Maybe<ResolversTypes['Animation']>, ParentType, ContextType, RequireFields<MutationupdateAnimationArgs, 'id'>>;
  updateComment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationupdateCommentArgs, 'albumId' | 'anon' | 'text'>>;
  updateGame?: Resolver<ResolversTypes['Game'], ParentType, ContextType, Partial<MutationupdateGameArgs>>;
  updatePass?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationupdatePassArgs, 'key' | 'pass'>>;
  updatePlatform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType, RequireFields<MutationupdatePlatformArgs, 'key' | 'type'>>;
  updatePublisher?: Resolver<ResolversTypes['Publisher'], ParentType, ContextType, RequireFields<MutationupdatePublisherArgs, 'id'>>;
  updateRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<MutationupdateRoleArgs, 'key' | 'name' | 'permissions'>>;
  updateSeries?: Resolver<ResolversTypes['Series'], ParentType, ContextType, Partial<MutationupdateSeriesArgs>>;
  updateStudio?: Resolver<ResolversTypes['Studio'], ParentType, ContextType, Partial<MutationupdateStudioArgs>>;
  updateUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, Partial<MutationupdateUserArgs>>;
  updateUserRoles?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationupdateUserRolesArgs, 'roles' | 'username'>>;
  uploadBanner?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationuploadBannerArgs, 'banner'>>;
};

export type PageResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  perms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Platform'] = ResolversParentTypes['Platform']> = {
  albums?: Resolver<Maybe<Array<Maybe<ResolversTypes['Album']>>>, ParentType, ContextType>;
  games?: Resolver<Array<Maybe<ResolversTypes['Game']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublisherResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Publisher'] = ResolversParentTypes['Publisher']> = {
  games?: Resolver<Maybe<Array<Maybe<ResolversTypes['Game']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType, Partial<QueryalbumArgs>>;
  albumCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  albums?: Resolver<Array<ResolversTypes['Album']>, ParentType, ContextType>;
  animation?: Resolver<ResolversTypes['Animation'], ParentType, ContextType, Partial<QueryanimationArgs>>;
  animations?: Resolver<Array<Maybe<ResolversTypes['Animation']>>, ParentType, ContextType>;
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  banners?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  categories?: Resolver<Array<Maybe<ResolversTypes['Category']>>, ParentType, ContextType>;
  classifications?: Resolver<Array<Maybe<ResolversTypes['Classification']>>, ParentType, ContextType>;
  config?: Resolver<Maybe<ResolversTypes['Config']>, ParentType, ContextType, Partial<QueryconfigArgs>>;
  downloads?: Resolver<Array<Maybe<ResolversTypes['Download']>>, ParentType, ContextType, RequireFields<QuerydownloadsArgs, 'id'>>;
  game?: Resolver<ResolversTypes['Game'], ParentType, ContextType, Partial<QuerygameArgs>>;
  games?: Resolver<Array<ResolversTypes['Game']>, ParentType, ContextType>;
  getRandomAlbum?: Resolver<Array<ResolversTypes['Album']>, ParentType, ContextType, Partial<QuerygetRandomAlbumArgs>>;
  highlight?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryloginArgs, 'password' | 'username'>>;
  me?: Resolver<Maybe<ResolversTypes['UserMe']>, ParentType, ContextType>;
  permissions?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  platform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType, Partial<QueryplatformArgs>>;
  platforms?: Resolver<Array<ResolversTypes['Platform']>, ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['Publisher'], ParentType, ContextType, RequireFields<QuerypublisherArgs, 'id'>>;
  publishers?: Resolver<Array<Maybe<ResolversTypes['Publisher']>>, ParentType, ContextType>;
  recentComments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType, Partial<QueryrecentCommentsArgs>>;
  recentPlatforms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Platform']>>>, ParentType, ContextType, RequireFields<QueryrecentPlatformsArgs, 'limit' | 'type'>>;
  recentPublishers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Publisher']>>>, ParentType, ContextType, RequireFields<QueryrecentPublishersArgs, 'limit'>>;
  recentSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Series']>>>, ParentType, ContextType, RequireFields<QueryrecentSeriesArgs, 'limit'>>;
  request?: Resolver<Maybe<ResolversTypes['Request']>, ParentType, ContextType, RequireFields<QueryrequestArgs, 'link'>>;
  requests?: Resolver<Array<Maybe<ResolversTypes['Request']>>, ParentType, ContextType, RequireFields<QueryrequestsArgs, 'donator'>>;
  roles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  searchAlbum?: Resolver<Maybe<ResolversTypes['SearchAlbumResult']>, ParentType, ContextType, Partial<QuerysearchAlbumArgs>>;
  searchAlbumByArtist?: Resolver<Maybe<ResolversTypes['SearchAlbumResult']>, ParentType, ContextType, RequireFields<QuerysearchAlbumByArtistArgs, 'name'>>;
  searchAnimation?: Resolver<Maybe<ResolversTypes['SearchAnimResult']>, ParentType, ContextType, Partial<QuerysearchAnimationArgs>>;
  searchGame?: Resolver<Maybe<ResolversTypes['SearchGameResult']>, ParentType, ContextType, Partial<QuerysearchGameArgs>>;
  searchPlatformsByCategories?: Resolver<Array<Maybe<ResolversTypes['Platform']>>, ParentType, ContextType, RequireFields<QuerysearchPlatformsByCategoriesArgs, 'categories'>>;
  searchPlatformsByName?: Resolver<Maybe<Array<Maybe<ResolversTypes['Platform']>>>, ParentType, ContextType, RequireFields<QuerysearchPlatformsByNameArgs, 'categories'>>;
  searchPublishersByName?: Resolver<Maybe<Array<Maybe<ResolversTypes['Publisher']>>>, ParentType, ContextType, Partial<QuerysearchPublishersByNameArgs>>;
  searchRequests?: Resolver<ResolversTypes['RequestResult'], ParentType, ContextType, Partial<QuerysearchRequestsArgs>>;
  searchSeries?: Resolver<Maybe<ResolversTypes['SearchSeriesResult']>, ParentType, ContextType, Partial<QuerysearchSeriesArgs>>;
  searchSeriesByName?: Resolver<Maybe<Array<Maybe<ResolversTypes['Series']>>>, ParentType, ContextType, Partial<QuerysearchSeriesByNameArgs>>;
  searchStudio?: Resolver<Maybe<ResolversTypes['SearchStudioResult']>, ParentType, ContextType, Partial<QuerysearchStudioArgs>>;
  series?: Resolver<Array<Maybe<ResolversTypes['Series']>>, ParentType, ContextType>;
  seriesOne?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType, Partial<QueryseriesOneArgs>>;
  studio?: Resolver<ResolversTypes['Studio'], ParentType, ContextType, RequireFields<QuerystudioArgs, 'slug'>>;
  studios?: Resolver<Array<Maybe<ResolversTypes['Studio']>>, ParentType, ContextType>;
  submissions?: Resolver<Array<Maybe<ResolversTypes['Submission']>>, ParentType, ContextType, Partial<QuerysubmissionsArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'username'>>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, Partial<QueryusersArgs>>;
  vgmdb?: Resolver<Maybe<ResolversTypes['VgmResult']>, ParentType, ContextType, RequireFields<QueryvgmdbArgs, 'url'>>;
};

export type RequestResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Request'] = ResolversParentTypes['Request']> = {
  comments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  donator?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['RequestResult'] = ResolversParentTypes['RequestResult']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rows?: Resolver<Array<Maybe<ResolversTypes['Request']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchAlbumResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchAlbumResult'] = ResolversParentTypes['SearchAlbumResult']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Album']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchAnimResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchAnimResult'] = ResolversParentTypes['SearchAnimResult']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Animation']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchGameResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchGameResult'] = ResolversParentTypes['SearchGameResult']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Game']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchSeriesResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchSeriesResult'] = ResolversParentTypes['SearchSeriesResult']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Series']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchStudioResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['SearchStudioResult'] = ResolversParentTypes['SearchStudioResult']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Studio']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeriesResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Series'] = ResolversParentTypes['Series']> = {
  games?: Resolver<Maybe<Array<Maybe<ResolversTypes['Game']>>>, ParentType, ContextType>;
  headerColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeholder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudioResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Studio'] = ResolversParentTypes['Studio']> = {
  animations?: Resolver<Array<Maybe<ResolversTypes['Animation']>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmissionResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Submission'] = ResolversParentTypes['Submission']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  links?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  request?: Resolver<Maybe<ResolversTypes['Request']>, ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submitter?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vgmdb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  favorites?: Resolver<Array<Maybe<ResolversTypes['Album']>>, ParentType, ContextType>;
  imgUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pages?: Resolver<Array<Maybe<ResolversTypes['Page']>>, ParentType, ContextType>;
  permissions?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  roles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMeResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['UserMe'] = ResolversParentTypes['UserMe']> = {
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favorites?: Resolver<Array<Maybe<ResolversTypes['Album']>>, ParentType, ContextType>;
  imgUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pages?: Resolver<Array<Maybe<ResolversTypes['Page']>>, ParentType, ContextType>;
  permissions?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  roles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VGMDBDiscResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['VGMDBDisc'] = ResolversParentTypes['VGMDBDisc']> = {
  number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tracks?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VgmResultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['VgmResult'] = ResolversParentTypes['VgmResult']> = {
  artists?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  categories?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  classifications?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  coverUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trackList?: Resolver<Array<Maybe<ResolversTypes['VGMDBDisc']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ResolverContext> = {
  Album?: AlbumResolvers<ContextType>;
  Animation?: AnimationResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  AvgRating?: AvgRatingResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Classification?: ClassificationResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Config?: ConfigResolvers<ContextType>;
  Disc?: DiscResolvers<ContextType>;
  Download?: DownloadResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Link?: LinkResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  Platform?: PlatformResolvers<ContextType>;
  Publisher?: PublisherResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Request?: RequestResolvers<ContextType>;
  RequestResult?: RequestResultResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  SearchAlbumResult?: SearchAlbumResultResolvers<ContextType>;
  SearchAnimResult?: SearchAnimResultResolvers<ContextType>;
  SearchGameResult?: SearchGameResultResolvers<ContextType>;
  SearchSeriesResult?: SearchSeriesResultResolvers<ContextType>;
  SearchStudioResult?: SearchStudioResultResolvers<ContextType>;
  Series?: SeriesResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  Studio?: StudioResolvers<ContextType>;
  Submission?: SubmissionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserMe?: UserMeResolvers<ContextType>;
  VGMDBDisc?: VGMDBDiscResolvers<ContextType>;
  VgmResult?: VgmResultResolvers<ContextType>;
};

