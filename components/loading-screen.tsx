import React, { useEffect, useRef } from 'react'
import { View, Animated, Easing } from 'react-native'
import { Sword } from "lucide-react-native"

const LoadingScreen = () => {
	const rotation = useRef(new Animated.Value(0)).current
	const scale1 = useRef(new Animated.Value(1)).current
	const scale2 = useRef(new Animated.Value(1)).current
	const scale3 = useRef(new Animated.Value(1)).current
	const opacity = useRef(new Animated.Value(0)).current
	const translateY = useRef(new Animated.Value(20)).current

	useEffect(() => {
		const rotationAnimation = Animated.loop(
			Animated.timing(rotation, {
				toValue: 1,
				duration: 2000,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		)

		const scaleAnimation = (scale: Animated.Value, toValue: number) =>
			Animated.loop(
				Animated.sequence([
					Animated.timing(scale, {
						toValue,
						duration: 1000,
						useNativeDriver: true,
					}),
					Animated.timing(scale, {
						toValue: 1,
						duration: 1000,
						useNativeDriver: true,
					}),
				])
			)

		rotationAnimation.start()
		scaleAnimation(scale1, 1.1).start()
		scaleAnimation(scale2, 1.15).start()
		scaleAnimation(scale3, 1.2).start()

		Animated.timing(opacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start()

		Animated.timing(translateY, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start()

		return () => {
			rotationAnimation.stop()
			scale1.stopAnimation()
			scale2.stopAnimation()
			scale3.stopAnimation()
		}
	}, [])

	const spin = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	})

	const circleStyle = "absolute border-white border-4 rounded-[48px]"

	return (
		<View
			className='bg-background flex-1 justify-center items-center'
		>
			<Animated.View className="w-[96px] h-[96px] mb-[32px]" style={[{ transform: [{ rotate: spin }] }]}>
				<Animated.View className={`${circleStyle} top-[0px] left-[0px] right-[0px] bottom-[0px] opacity-25`} style={[{ transform: [{ scale: scale1 }] }]} />
				<Animated.View className={`${circleStyle} top-[8px] left-[8px] right-[8px] bottom-[8px] opacity-50`} style={[{ transform: [{ scale: scale2 }] }]} />
				<Animated.View className={`${circleStyle} top-[16px] left-[16px] right-[16px] bottom-[16px] opacity-75`} style={[{ transform: [{ scale: scale3 }] }]} />
				<View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
					<Sword size={48} color="white" />
				</View>
			</Animated.View>
		</View>
	)
}

export default LoadingScreen
