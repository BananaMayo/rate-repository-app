import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useMe from '../hooks/useMe';
import useDeleteReview from '../hooks/useDeleteReview';

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
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    gap: 15,
 },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
 },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  buttonText: {
    color: 'white',
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, onViewRepository, onDeleteReview }) => {
  return (
    <View style={styles.reviewWrapper}>
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

      <View style={styles.actions}>
        <Pressable
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => onViewRepository(review.repository.id)}
        >
          <Text fontWeight="bold" style={styles.buttonText}>
            View repository
          </Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDeleteReview(review.id)}
        >
          <Text fontWeight="bold" style={styles.buttonText}>
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { me, refetch } = useMe({ includeReviews: true });
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const reviews = me?.reviews
    ? me.reviews.edges.map(edge => edge.node)
    : [];

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const handleDeleteReview = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview(reviewId);
            refetch();
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepository={handleViewRepository}
          onDeleteReview={handleDeleteReview}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
