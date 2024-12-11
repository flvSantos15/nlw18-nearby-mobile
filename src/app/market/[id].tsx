import { useEffect, useState } from 'react'
import { Alert, Modal, Text, View } from 'react-native'
import { router, useLocalSearchParams, Redirect } from 'expo-router'

import { api } from '@/services/api'
import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { Details, DetailsProps } from '@/components/market/details'
import { Coupon } from '@/components/market/coupon'
import { Button } from '@/components/button'

type MarketProps = DetailsProps & {
  cover: string
}

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()

  const [market, setMarket] = useState<MarketProps | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [coupon, setCoupon] = useState<string | null>(null)

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

  function handleOpenCamera() {
    setIsVisibleCameraModal(true)
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
      {coupon && <Coupon code={coupon} />}

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button onPress={() => setIsVisibleCameraModal(false)}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
