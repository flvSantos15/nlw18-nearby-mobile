import { useEffect, useRef, useState } from 'react'
import { Alert, Modal, ScrollView, StatusBar, Text, View } from 'react-native'
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import { useCameraPermissions, CameraView } from 'expo-camera'

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
  const [_, requestPermission] = useCameraPermissions()

  const [market, setMarket] = useState<MarketProps | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [isFetchingCoupon, setIsFetchingCoupon] = useState(true)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [coupon, setCoupon] = useState<string | null>(null)

  const qrLock = useRef(false)

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

  async function handleOpenCamera() {
    const { granted } = await requestPermission()

    if (!granted) {
      return Alert.alert('Câmera', 'Você precisa habilitar o uso da câmera.')
    }

    qrLock.current = false
    setIsVisibleCameraModal(true)
  }

  async function getCoupon(id: string) {
    try {
      const { data } = await api.patch(`/coupon/${id}`)

      Alert.alert('Copom', data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível utilizar o cupom.')
    } finally {
      setIsVisibleCameraModal(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)

    Alert.alert(
      'Cupom',
      'Não é possível reutilizar um cupom resgatado. Deseja realmente resgat o cupom?',
      [
        { style: 'cancel', text: 'Não' },
        { text: 'Sim', onPress: () => getCoupon(id) }
      ]
    )
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) {
    return <Loading />
  }

  if (!market) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market?.cover} />
        <Details data={market} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />

        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={isFetchingCoupon}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
