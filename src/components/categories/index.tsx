import { FlatList } from 'react-native'

import { s } from './styles'
import { Category } from '../category'

export type CategoriesProps = {
  id: string
  name: string
}

type Categories = {
  data: CategoriesProps[]
  selectedCategoryId: string
  onSelectCategoryId: (id: string) => void
}

export function Categories({
  data,
  selectedCategoryId,
  onSelectCategoryId
}: Categories) {
  return (
    <FlatList
      style={s.container}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelectCategoryId(item.id)}
          isSelected={item.id === selectedCategoryId}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.content}
    />
  )
}
