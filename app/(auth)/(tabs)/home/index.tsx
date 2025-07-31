import { StyleSheet, View, Text } from 'react-native';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Home</Text>
            <Text style={styles.subtitle}>Your fitness journey starts here</Text>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});