export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agency: {
        Row: {
          agency_id: number
          geo_id: number
          id: number
          대표자: string
          등록번호: string
          등록일자: string
          상태: string
          상호: string
          소재지: string
          행정처분시작일자: string | null
          행정처분종료일자: string | null
        }
        Insert: {
          agency_id: number
          geo_id: number
          id?: number
          대표자: string
          등록번호: string
          등록일자: string
          상태: string
          상호: string
          소재지: string
          행정처분시작일자?: string | null
          행정처분종료일자?: string | null
        }
        Update: {
          agency_id?: number
          geo_id?: number
          id?: number
          대표자?: string
          등록번호?: string
          등록일자?: string
          상태?: string
          상호?: string
          소재지?: string
          행정처분시작일자?: string | null
          행정처분종료일자?: string | null
        }
        Relationships: []
      }
      geo: {
        Row: {
          dong: string
          geo_id: number
          id: number
          sido: string
          sigungu: string
        }
        Insert: {
          dong: string
          geo_id: number
          id?: number
          sido: string
          sigungu: string
        }
        Update: {
          dong?: string
          geo_id?: number
          id?: number
          sido?: string
          sigungu?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          agency_id: number
          date: string
          id: number
          point: number
          text: string | null
          username: string
        }
        Insert: {
          agency_id?: number
          date: string
          id?: number
          point: number
          text?: string | null
          username: string
        }
        Update: {
          agency_id?: number
          date?: string
          id?: number
          point?: number
          text?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
