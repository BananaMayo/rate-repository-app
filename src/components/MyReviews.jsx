import { FlatList, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
  },

  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  reviewContent: {
    flex: 1,
  },
  date: {
    marginBottom: 10,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text fontWeight="bold" style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>

      <View style={styles.reviewContent}>
        <Text fontWeight="bold">{review.repository.fullName}</Text>
        <Text color="textSecondary" style={styles.date}>
          {format(new Date(review.createdAt), 'dd MMM yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { me } = useMe({ includeReviews: true });

  const reviews = me?.reviews
    ? me.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
