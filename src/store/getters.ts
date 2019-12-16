import { BaseState } from "@/types/context"

export const visible = (state:BaseState) => state.modal.visible
export const isLogin = (state:BaseState) => !!state.selfInfo.id