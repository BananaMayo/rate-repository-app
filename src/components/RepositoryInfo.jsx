import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const RepositoryInfo = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) {
    return null;
  }

  return <RepositoryItem item={repository} showGitHubButton />;
};

export default RepositoryInfo;
