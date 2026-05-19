import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  text: yup.string(),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#24292e',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    fontSize: theme.fontSizes.subheading,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      try {
        const { data } = await createReview(values);
        navigate(`/repository/${data.createReview.repositoryId}`);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const fieldError = field => formik.touched[field] && formik.errors[field];

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, fieldError('ownerName') && styles.inputError]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {fieldError('ownerName') && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[styles.input, fieldError('repositoryName') && styles.inputError]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {fieldError('repositoryName') && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[styles.input, fieldError('rating') && styles.inputError]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
      />
      {fieldError('rating') && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        multiline
      />

      <Pressable style={styles.button} onPress={() => formik.handleSubmit()}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;

