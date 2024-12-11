import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { router, useLocalSearchParams, Redirect } from 'expo-router'

import { api } from '@/services/api'
import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { Details, DetailsProps } from '@/components/market/details'

type MarketProps = DetailsProps & {
  cover: string
}

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()

  const [market, setMarket] = useState<MarketProps | null>(null)
  const [isLoading, setLoading] = useState(true)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setMarket(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível carregar os dados', [
        { text: 'OK', onPress: () => router.back() }
      ])
    }
  }

  useEffect(() => {
    if (params.id) fetchMarket()
  }, [params.id])

  if (isLoading) {
    return <Loading />
  }

  if (!market) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <Cover uri={market?.cover} />

      <Details data={market} />
    </View>
  )
}
