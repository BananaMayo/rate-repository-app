import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  fullName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    marginBottom: 6,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
  },
});

const formatThousands = (value) => {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

        <View style={styles.info}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {formatThousands(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {formatThousands(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
