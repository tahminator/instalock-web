export type RiotMatchInfoType =
  | {
      httpStatus: number;
      errorCode: undefined;
      message?: string;
      Version: number;
      Subject: string;
      Matches: Match[];
    }
  | {
      httpStatus: number;
      errorCode: string;
      message: string;
    };

type Match = {
  MatchID: string;
  MapID: string;
  SeasonID: string;
  MatchStartTime: number;
  TierAfterUpdate: number;
  TierBeforeUpdate: number;
  RankedRatingAfterUpdate: number;
  RankedRatingBeforeUpdate: number;
  RankedRatingEarned: number;
  RankedRatingPerformanceBonus: number;
  CompetitiveMovement: string;
  AFKPenalty: number;
};

// To parse this data:
//
//   import { type AutoGenMatchMeta } from "./file";
//

export type AutoGenMatchMeta = {
  matchInfo?: MatchInfo;
  players?: Player[];
  bots?: any[];
  coaches?: any[];
  teams?: Team[];
  roundResults?: RoundResultElement[];
  kills?: Kill[];
};

export type Kill = {
  gameTime?: number;
  roundTime?: number;
  round?: number;
  killer?: string;
  victim?: string;
  victimLocation?: Location;
  assistants?: string[];
  playerLocations?: PlayerLocation[];
  finishingDamage?: FinishingDamage;
};

export type FinishingDamage = {
  damageType?: DamageType;
  damageItem?: DamageItem;
  isSecondaryFireMode?: boolean;
};

export enum DamageItem {
  A03B24D34319996D0F8C94Bbfba1Dfc7 = "A03B24D3-4319-996D-0F8C-94BBFBA1DFC7",
  Ae3De1424D852547Dd264E90Bed35Cf7 = "AE3DE142-4D85-2547-DD26-4E90BED35CF7",
  C4883E504494202C3Ec36B8A9284F00B = "C4883E50-4494-202C-3EC3-6B8A9284F00B",
  E336C6B8418D9340D77F7A9E4Cfe0702 = "E336C6B8-418D-9340-D77F-7A9E4CFE0702",
  Ec845Bf44F79DddaA3Da0Db3774B2794 = "EC845BF4-4F79-DDDA-A3DA-0DB3774B2794",
  Ee8E8D15496B07ACE5F68Fae5D4C7B1A = "EE8E8D15-496B-07AC-E5F6-8FAE5D4C7B1A",
  Empty = "",
  The1Baa85B44C70128464Bb6481Dfc3Bb4E = "1BAA85B4-4C70-1284-64BB-6481DFC3BB4E",
  The29A0Cfab485BF5D5779AB59F85E204A8 = "29A0CFAB-485B-F5D5-779A-B59F85E204A8",
  The39099Fb54293Def41E092E9080Ce7456 = "39099FB5-4293-DEF4-1E09-2E9080CE7456",
  The44D4E95C4157003781B217841Bf2E8E3 = "44D4E95C-4157-0037-81B2-17841BF2E8E3",
  The462080D1403529377C0927Aa2A5C27A7 = "462080D1-4035-2937-7C09-27AA2A5C27A7",
  The4Ade7Faa4Cf1837695Ef39884480959B = "4ADE7FAA-4CF1-8376-95EF-39884480959B",
  The910Be174449BC412Ab22D0873436B21B = "910BE174-449B-C412-AB22-D0873436B21B",
  The9C82E19D457502001A813Eacf00Cf872 = "9C82E19D-4575-0200-1A81-3EACF00CF872",
  Ultimate = "Ultimate",
}

export enum DamageType {
  Ability = "Ability",
  Bomb = "Bomb",
  Weapon = "Weapon",
}

export type PlayerLocation = {
  subject?: string;
  viewRadians?: number;
  location?: Location;
};

export type Location = {
  x?: number;
  y?: number;
};

export type MatchInfo = {
  matchId?: string;
  mapId?: string;
  gamePodId?: string;
  gameLoopZone?: string;
  gameServerAddress?: string;
  gameVersion?: string;
  gameLengthMillis?: number;
  gameStartMillis?: number;
  provisioningFlowID?: string;
  isCompleted?: boolean;
  isEarlyCompletion?: boolean;
  customGameName?: string;
  forcePostProcessing?: boolean;
  queueID?: string;
  gameMode?: string;
  isRanked?: boolean;
  isMatchSampled?: boolean;
  seasonId?: string;
  completionState?: string;
  platformType?: PlatformType;
  premierMatchInfo?: PremierMatchInfo;
  partyRRPenalties?: { [key: string]: number };
  shouldMatchDisablePenalties?: boolean;
};

export enum PlatformType {
  PC = "pc",
}

export type PremierMatchInfo = {};

export type Player = {
  gameName?: string;
  tagLine?: string;
  platformInfo?: PlatformInfo;
  teamId?: TeamID;
  partyId?: string;
  characterId?: string;
  stats?: Stats;
  roundDamage?: RoundDamage[];
  competitiveTier?: number;
  isObserver?: boolean;
  playerCard?: string;
  playerTitle?: string;
  preferredLevelBorder?: string;
  sessionPlaytimeMinutes?: number;
  behaviorFactors?: BehaviorFactors;
  newPlayerExperienceDetails?: NewPlayerExperienceDetails;
  participationPeriods?: ParticipationPeriod[];
  subject?: string;
  accountLevel?: number;
  xpModifications?: XPModification[];
};

export type BehaviorFactors = {
  afkRounds?: number;
  collisions?: number;
  commsRatingRecovery?: number;
  damageParticipationOutgoing?: number;
  friendlyFireIncoming?: number;
  friendlyFireOutgoing?: number;
  mouseMovement?: number;
  selfDamage?: number;
  stayedInSpawnRounds?: number;
};

export type NewPlayerExperienceDetails = {
  basicMovement?: BasicGunSkillClass;
  basicGunSkill?: BasicGunSkillClass;
  adaptiveBots?: AdaptiveBots;
  ability?: BasicGunSkillClass;
  bombPlant?: BasicGunSkillClass;
  defendBombSite?: DefendBombSite;
  settingStatus?: SettingStatus;
  versionString?: string;
};

export type BasicGunSkillClass = {
  idleTimeMillis?: number;
  objectiveCompleteTimeMillis?: number;
};

export type AdaptiveBots = {
  idleTimeMillis?: number;
  objectiveCompleteTimeMillis?: number;
  adaptiveBotAverageDurationMillisAllAttempts?: number;
  adaptiveBotAverageDurationMillisFirstAttempt?: number;
  killDetailsFirstAttempt?: null;
};

export type DefendBombSite = {
  idleTimeMillis?: number;
  objectiveCompleteTimeMillis?: number;
  success?: boolean;
};

export type SettingStatus = {
  isMouseSensitivityDefault?: boolean;
  isCrosshairDefault?: boolean;
};

export type ParticipationPeriod = {
  sessionStartTime?: Date;
  sessionEndTime?: Date;
};

export type PlatformInfo = {
  platformType?: PlatformType;
  platformOS?: PlatformOS;
  platformOSVersion?: PlatformOSVersion;
  platformChipset?: PlatformChipset;
  platformDevice?: string;
};

export enum PlatformChipset {
  Unknown = "Unknown",
}

export enum PlatformOS {
  Windows = "Windows",
}

export enum PlatformOSVersion {
  The10019045176864Bit = "10.0.19045.1.768.64bit",
  The10022631125664Bit = "10.0.22631.1.256.64bit",
  The10022631176864Bit = "10.0.22631.1.768.64bit",
}

export type RoundDamage = {
  round?: number;
  receiver?: string;
  damage?: number;
};

export type Stats = {
  score?: number;
  roundsPlayed?: number;
  kills?: number;
  deaths?: number;
  assists?: number;
  playtimeMillis?: number;
  abilityCasts?: AbilityCasts;
};

export type AbilityCasts = {
  grenadeCasts?: number;
  ability1Casts?: number;
  ability2Casts?: number;
  ultimateCasts?: number;
};

export enum TeamID {
  Blue = "Blue",
  Red = "Red",
}

export type XPModification = {
  Value?: number;
  ID?: string;
  IncludeInV2?: boolean;
  Type?: number;
};

export type RoundResultElement = {
  roundNum?: number;
  roundResult?: RoundResultEnum;
  roundCeremony?: RoundCeremony;
  winningTeam?: TeamID;
  winningTeamRole?: WinningTeamRole;
  plantRoundTime?: number;
  plantPlayerLocations?: PlayerLocation[] | null;
  plantLocation?: Location;
  plantSite?: PlantSite;
  defuseRoundTime?: number;
  defusePlayerLocations?: PlayerLocation[] | null;
  defuseLocation?: Location;
  playerStats?: PlayerStat[];
  roundResultCode?: RoundResultCode;
  playerEconomies?: Economy[];
  playerScores?: PlayerScore[];
  bombPlanter?: string;
  bombDefuser?: string;
};

export enum PlantSite {
  A = "A",
  B = "B",
  C = "C",
  Empty = "",
}

export type Economy = {
  subject?: string;
  loadoutValue?: number;
  weapon?: DamageItem;
  armor?: Armor;
  remaining?: number;
  spent?: number;
};

export enum Armor {
  B1B9086D41BdA5165D29E3B34A6F1644 = "B1B9086D-41BD-A516-5D29-E3B34A6F1644",
  Empty = "",
  The4Dec83D549029Ab3Bed6A7A390761157 = "4DEC83D5-4902-9AB3-BED6-A7A390761157",
  The822Bcab240A2324EC137E09195Ad7692 = "822BCAB2-40A2-324E-C137-E09195AD7692",
}

export type PlayerScore = {
  subject?: string;
  score?: number;
};

export type PlayerStat = {
  subject?: string;
  kills?: Kill[];
  damage?: Damage[];
  score?: number;
  economy?: Economy;
  ability?: PlayerStatAbility;
  wasAfk?: boolean;
  wasPenalized?: boolean;
  stayedInSpawn?: boolean;
};

export type PlayerStatAbility = {
  grenadeEffects?: null;
  ability1Effects?: null;
  ability2Effects?: null;
  ultimateEffects?: null;
};

export type Damage = {
  receiver?: string;
  damage?: number;
  legshots?: number;
  bodyshots?: number;
  headshots?: number;
};

export enum RoundCeremony {
  CeremonyCloser = "CeremonyCloser",
  CeremonyClutch = "CeremonyClutch",
  CeremonyDefault = "CeremonyDefault",
  CeremonyThrifty = "CeremonyThrifty",
}

export enum RoundResultEnum {
  BombDefused = "Bomb defused",
  BombDetonated = "Bomb detonated",
  Eliminated = "Eliminated",
}

export enum RoundResultCode {
  Defuse = "Defuse",
  Detonate = "Detonate",
  Elimination = "Elimination",
}

export enum WinningTeamRole {
  Attacker = "Attacker",
  Defender = "Defender",
}

export type Team = {
  teamId?: TeamID;
  won?: boolean;
  roundsPlayed?: number;
  roundsWon?: number;
  numPoints?: number;
};

type RiotPreGameFailType = {
  httpStatus: number;
  errorCode: string;
  message: string;
};

type RiotPreGamePassType = {
  httpStatus: undefined;
  Subject: string;
  MatchID: string;
  Version: number;
};

export type RiotPreGameApiType = RiotPreGameFailType | RiotPreGamePassType;

export type RiotPreGameDataType = {
  ID: string;
  Version: number;
  Teams: RTeam[];
  AllyTeam: RTeam;
  EnemyTeam: null;
  ObserverSubjects: any[];
  MatchCoaches: any[];
  EnemyTeamSize: number;
  EnemyTeamLockCount: number;
  PregameState: string;
  LastUpdated: Date;
  MapID: string;
  MapSelectPool: any[];
  BannedMapIDs: any[];
  CastedVotes: CastedVotes;
  MapSelectSteps: any[];
  MapSelectStep: number;
  Team1: string;
  GamePodID: string;
  Mode: string;
  VoiceSessionID: string;
  MUCName: string;
  TeamMatchToken: string;
  QueueID: string;
  ProvisioningFlowID: string;
  IsRanked: boolean;
  PhaseTimeRemainingNS: number;
  StepTimeRemainingNS: number;
  altModesFlagADA: boolean;
  TournamentMetadata: null;
  RosterMetadata: null;
};

export type RTeam = {
  TeamID: string;
  Players: RPlayer[];
};

export type RPlayer = {
  Subject: string;
  CharacterID: string;
  CharacterSelectionState: CharacterSelectionState;
  PregamePlayerState: PregamePlayerState;
  CompetitiveTier: number;
  PlayerIdentity: PlayerIdentity;
  SeasonalBadgeInfo: SeasonalBadgeInfo;
  IsCaptain: boolean;
  PlatformType: RPlatformType;
};

export enum CharacterSelectionState {
  Empty = "",
  Locked = "locked",
  Selected = "selected",
}

export enum RPlatformType {
  PC = "pc",
}

export type PlayerIdentity = {
  Subject: string;
  PlayerCardID: string;
  PlayerTitleID: string;
  AccountLevel: number;
  PreferredLevelBorderID: string;
  Incognito: boolean;
  HideAccountLevel: boolean;
};

export enum PregamePlayerState {
  Joined = "joined",
}

export type SeasonalBadgeInfo = {
  SeasonID: string;
  NumberOfWins: number;
  WinsByTier: null;
  Rank: number;
  LeaderboardRank: number;
};

export type CastedVotes = {};
