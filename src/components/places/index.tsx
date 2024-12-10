import { Text, useWindowDimensions } from 'react-native'

import { Place, TPlace } from '../place'

import { s } from './styles'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useRef } from 'react'

type PlacesProps = {
  data: TPlace[]
}

export function Places({ data }: PlacesProps) {
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)

  return (
    <BottomSheet>
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} />}
      />
    </BottomSheet>
  )
}
