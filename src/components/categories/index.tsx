import { FlatList } from 'react-native'

import { s } from './styles'
import { Category } from '../category'

export type CategoriesProps = {
  id: string
  name: string
}

type Categories = {
  data: CategoriesProps[]
}

export function Categories({ data }: Categories) {
  return (
    <FlatList
      style={s.container}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Category name={item.name} iconId={item.id} />}
      horizontal
      showsHorizontalScrollIndicator
      contentContainerStyle={s.content}
    />
  )
}
