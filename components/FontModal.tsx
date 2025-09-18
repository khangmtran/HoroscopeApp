import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const FontModal = forwardRef<BottomSheetModal>((props, ref) => {
  
  return (
    <View>
      <Text>FontModal</Text>
    </View>
  )
})

export default FontModal

const styles = StyleSheet.create({})