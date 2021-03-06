import { Vector2 } from '@among-js/util'
import {
  GameDataType,
  SceneChangeLocation,
  PayloadType,
  RPCFlag
} from './enums'

// Payload packets
// https://wiki.weewoo.net/wiki/Protocol#Reliable_Packets
export type PayloadPacket =
  | GameDataPayloadPacket
  | GameDataToPayloadPacket
  | JoinedGamePayloadPacket
  | RedirectPayloadPacket
  | JoinGameErrorPayloadPacket
  | JoinGameRequestPayloadPacket

// https://wiki.weewoo.net/wiki/Protocol#5.2C_6_-_Game_Data_and_Game_Data_To
export interface GameDataPayloadPacket {
  type: PayloadType.GameData
  code: number
  parts: GameDataPacket[]
}

// https://wiki.weewoo.net/wiki/Protocol#5.2C_6_-_Game_Data_and_Game_Data_To
export interface GameDataToPayloadPacket {
  type: PayloadType.GameDataTo
  code: number
  recipient: number
  parts: GameDataPacket[]
}

// TODO: Document
export interface JoinedGamePayloadPacket {
  type: PayloadType.JoinedGame
  code: number
  playerId: number
  hostId: number
}

// https://wiki.weewoo.net/wiki/Protocol#Server_To_Client
export interface JoinGameErrorPayloadPacket {
  type: PayloadType.JoinGame
  reason: Error
}

// https://wiki.weewoo.net/wiki/Protocol#Client_To_Server
export interface JoinGameRequestPayloadPacket {
  type: PayloadType.JoinGame
  code: number
}

// https://wiki.weewoo.net/wiki/Protocol#13_-_Redirect
export interface RedirectPayloadPacket {
  type: PayloadType.Redirect
  port: number
  ip: string
}

// Game data packets
// https://wiki.weewoo.net/wiki/Protocol#5.2C_6_-_Game_Data_and_Game_Data_To
export type GameDataPacket =
  | RPCGameDataPacket
  | SpawnGameDataPacket
  | DataGameDataPacket
  | SceneChangeGameDataPacket

// https://wiki.weewoo.net/wiki/Protocol#2_-_RPC_Game_Data
export interface RPCGameDataPacket {
  type: GameDataType.RPC
  netId: number
  flag: RPCFlag
  data: ByteBuffer
}

// https://wiki.weewoo.net/wiki/Protocol#4_-_Spawn
export interface SpawnGameDataPacket {
  type: GameDataType.Spawn
  spawnId: number
  ownerId: number
  flags: number
  components: GameComponent[]
}

// https://wiki.weewoo.net/wiki/Protocol#1_-_Data
export interface DataGameDataPacket {
  type: GameDataType.Data
  netId: number
  sequence: number
  position: Vector2
  velocity: Vector2
}

// https://wiki.weewoo.net/wiki/Protocol#6_-_Scene_Change
export interface SceneChangeGameDataPacket {
  type: GameDataType.SceneChange
  playerId: number
  location: SceneChangeLocation
}

// Game component
// https://wiki.weewoo.net/wiki/Components
export interface GameComponent {
  netId: number
  data: ByteBuffer
}
