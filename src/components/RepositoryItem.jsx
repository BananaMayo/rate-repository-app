import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

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

    marginBottom: 4,
  },
  description: {
    marginBottom: 6,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  languageText: {
    color: 'white',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
});

const formatThousands = (value) => {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
};

const LanguageTag = ({ children }) => {
  return (
    <View style={styles.language}>
      <Text style={styles.languageText}>{children}</Text>
    </View>
  );
};

const Stat = ({ value, label }) => {
  return (
    <View style={styles.statItem}>
      <Text fontWeight="bold">{value}</Text>
      <Text>{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

        <View style={styles.info}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.fullName}>
            {item.fullName}
          </Text>

          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>

          <LanguageTag>{item.language}</LanguageTag>
        </View>
      </View>

      <View style={styles.stats}>
        <Stat value={formatThousands(item.stargazersCount)} label="Stars" />
        <Stat value={formatThousands(item.forksCount)} label="Forks" />
        <Stat value={item.reviewCount} label="Reviews" />
        <Stat value={item.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;