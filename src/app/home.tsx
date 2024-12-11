import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import { api } from '@/services/api'

import { Categories, CategoriesProps } from '@/components/categories'
import { TPlace } from '@/components/place'
import { Places } from '@/components/places'

import { fontFamily, colors } from '@/styles/theme'
import { router } from 'expo-router'

type TMarketProps = TPlace & {
  latitude: number
  longitude: number
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494
}
// const currentLocation = {
//   latitude: -2.5163661159525534,
//   longitude: -44.2050185942473
// }

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

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()

      if (granted) {
        const location = await Location.getCurrentPositionAsync({})
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    // getCurrentLocation()
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

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
          }}
          image={require('@/assets/location.png')}
        />

        {markets.map((market) => {
          return (
            <Marker
              key={market.id}
              identifier={market.id}
              coordinate={{
                latitude: market.latitude,
                longitude: market.longitude
              }}
              image={require('@/assets/location.png')}
            >
              <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.gray[600],
                      fontFamily: fontFamily.medium
                    }}
                  >
                    {market.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.gray[600],
                      fontFamily: fontFamily.regular
                    }}
                  >
                    {market.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <Places data={markets} />
    </View>
  )
}
