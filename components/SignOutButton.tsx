import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export const SignOutButton = () => {
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk()
    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to your desired page
            Linking.openURL(Linking.createURL('/'))
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }
    return (
        <TouchableOpacity 
            onPress={handleSignOut}
            className="overflow-hidden rounded-xl bg-red-500 shadow-md"
        >
            <View className="flex-row items-center justify-center px-6 py-4">
                <Ionicons name="log-out-outline" size={20} color="white" />
                <Text className="ml-2 font-semibold text-white">Sign Out</Text>
            </View>
        </TouchableOpacity>
    )
}