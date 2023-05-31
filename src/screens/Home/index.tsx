import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import  Participant  from './../../components/Participant';


export default function Home() {


    const [ participants, setParticipants ] = useState<string[]>([]);
    const [ participantName, setParticipantName ] = useState('');


    function handleParticipantAdd() {

        if(participants.includes(participantName)) {
          return Alert.alert("Erro","Já existe esse nome na lista de participantes")
        }

        setParticipants(prevState => [...prevState, participantName])
        setParticipantName('');

    }

    function handleParticipantRemove(name: string) {


        Alert.alert("Remover",`Remover o participante ${name} ?`, [
           {
            text: "Sim",
            onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
           }, 
           {
            text: "Não",
            style: 'cancel',
           }
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do evento
            </Text>
            <Text style={styles.eventDate}>
                Sexta, 28 de abril de 2023.
            </Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor="#6B6B6B"
                    onChangeText={text => setParticipantName(text)}
                    value={participantName}
                >
                </TextInput>
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <Participant
                    key={item} 
                    name={item} 
                    onRemove={() => handleParticipantRemove(item)}/>
                )
            } 
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <Text style={styles.listEmptyText}>
                    Sem participantes no evento
                </Text>
            )}
            />
        </View>
    );
}