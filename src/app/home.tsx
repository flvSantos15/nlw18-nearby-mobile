import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'

import { api } from '@/services/api'

import { Categories, CategoriesProps } from '@/components/categories'
import { TPlace } from '@/components/place'
import { Places } from '@/components/places'

type TMarketProps = TPlace

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps[]>([])
  const [markets, setMarkets] = useState<TMarketProps[]>([])
  const [category, setCategory] = useState<string>('')

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
      setCategory(data[0]?.id)
    } catch (error) {
      console.log(error)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias.')
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return

      const { data } = await api.get(`/markets/category/${category}`)
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Locais', 'Não foi possível carregar os locais.')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (category) fetchMarkets()
  }, [category])

  return (
    <View style={{ flex: 1, backgroundColor: '#cecece' }}>
      <Categories
        data={categories}
        selectedCategoryId={category}
        onSelectCategoryId={setCategory}
      />

      <Places data={markets} />
    </View>
  )
}
