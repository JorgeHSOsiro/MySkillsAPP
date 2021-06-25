import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

interface SkillData {
  id: string;
  name: string;
}


export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [skillList, setSkillList] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  const handleAddNewSkill = () => {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    }
    setSkillList([...skillList, data]);
    setNewSkill('');
  };

  const handleRemoveSKill = (id: string) => {
    setSkillList((oldState) => oldState.filter((skill) => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    console.log(currentHour)

    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good night');
    }
  }, [skillList]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>React Native</Text>
        <Text style={styles.greeting}>{greeting}</Text>
        <TextInput
          style={styles.input}
          placeholder="New Skill"
          placeholderTextColor="#555"
          value={newSkill}
          onChangeText={setNewSkill}
        />

        <Button title="Add" onPress={handleAddNewSkill} />
        {/* se eu quiser reutilizar um estilo posso passa-lo dentro de um vetor e adicionar o que é diferente como visto abaixo */}
        <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

        {/* scrollview x flatlist - 
        a flat é recomendada pois não carrega todos os elementos da listagem, somente o que é mostrado na tela, 
        scroll - poucos itens não há problema, precisa usar map */}
        <FlatList
          data={skillList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Card skill={item.name} onPress={() =>handleRemoveSKill(item.id)} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  input: {
    backgroundColor: '#1f1e25',
    color: '#ffffff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
  },
});
