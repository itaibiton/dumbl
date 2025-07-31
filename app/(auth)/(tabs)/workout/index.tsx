import { StyleSheet, View, Text } from 'react-native';

const WorkoutPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workouts</Text>
            <Text style={styles.subtitle}>Track your exercises and progress</Text>
        </View>
    );
};

export default WorkoutPage;

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