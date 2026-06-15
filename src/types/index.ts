export type IucnCode = 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'DD' | 'NE'

export type SeafoodCategory =
  | 'Fish'
  | 'Crustacean'
  | 'Cephalopod'
  | 'Shellfish'

export interface Seafood {
  id: string
  commonName: string
  localNames: string[]
  scientificName: string
  category: SeafoodCategory
  illustrationKey: string
  iucnStatus: IucnCode
  iucnNote: string
  pricePer100g: string
  sizeLength: string
  sizeWeight: string
  habitat: string
  flavour: string
  texture: string
  preparation: string
  description: string
  recognitionKeywords: string[]
  recipeIds: string[]
}

export interface RecipeIngredient {
  name: string
  amount: string
}

export interface Recipe {
  id: string
  name: string
  cuisine: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  prepTimeMinutes: number
  description: string
  seafoodIds: string[]
  ingredients: RecipeIngredient[]
  steps: string[]
  tip: string
  inspiredBy: string
}

export interface RecognitionMatch {
  seafoodId: string | null
  commonName: string
  confidence: number
  reasoning: string
}
