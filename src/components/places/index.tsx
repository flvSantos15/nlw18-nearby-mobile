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

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} />}
        contentContainerStyle={s.content}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locais perto de você</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  )
}
