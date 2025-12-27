import { Dexie, type EntityTable } from "dexie"

export type SessionType = 'focus' | 'short-break' | 'long-break'

export interface Session {
    id: string
    type: SessionType
    startTime: string
    endTime: string | null
    completed: boolean
    label: string
}

const db = new Dexie("FocusFlowDatabase") as Dexie & {
    sessions: EntityTable<Session, "id", Session>,
}

db.version(2).stores({
    sessions: "++id, type, startTime, endTime, completed, time, label",
})

export default db