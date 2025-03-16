import { Favorite, Rating } from "@prisma/client"
import { atom } from "jotai"
import { MediaDetails } from "../models/MediaDetails"

export const mediaListAtom = atom<MediaDetails[]>([])
export const modalDetailsAtom = atom<MediaDetails>()
export const sidebarVisibleAtom = atom<boolean>(false)
export const favoritesAtom = atom<Favorite[]>([])
export const userRatingsAtom = atom<Rating[]>([])
export const mediaNotFoundAtom = atom<boolean>(false)
