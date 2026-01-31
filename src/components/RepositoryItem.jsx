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

const StyledText = ({ bold, muted, style, children, ...props }) => {
  const textStyles = [
    styles.text,
    muted && styles.muted,
    bold && styles.bold,
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

const LanguageTag = ({ children }) => {
  return (
    <View style={styles.language}>
      <Text style={styles.LanguageTagText}>{children}</Text>
    </View>
  );
};

const Stat = ({ value, label }) => {
  return (
    <View style={styles.statItem}>
      <StyledText bold style={styles.statValue}>
        {value}
      </StyledText>
      <StyledText muted>{label}</StyledText>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

        <View style={styles.info}>
          <StyledText bold style={styles.fullName}>
            {item.fullName}
          </StyledText>

          <StyledText muted style={styles.description}>
            {item.description}
          </StyledText>

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