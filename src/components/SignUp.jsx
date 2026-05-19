import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
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

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      const { username, password } = values;

      try {
        await createUser({ username, password });
        await signIn({ username, password });
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    },
  });

  const fieldError = field => formik.touched[field] && formik.errors[field];

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, fieldError('username') && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {fieldError('username') && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[styles.input, fieldError('password') && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {fieldError('password') && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          fieldError('passwordConfirmation') && styles.inputError,
        ]}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
      />
      {fieldError('passwordConfirmation') && (
        <Text style={styles.errorText}>
          {formik.errors.passwordConfirmation}
        </Text>
      )}

      <Pressable style={styles.button} onPress={() => formik.handleSubmit()}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
