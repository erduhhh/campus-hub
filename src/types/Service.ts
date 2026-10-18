export type ServiceStatus = 'new' | 'available' | 'unavailable';
export type SdgCategory = 'all' | 'education' | 'eco' | 'health' | 'partnership';

export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  sdgNumber?: number;
  sdgTitle?: string;
  sdgCategory?: SdgCategory;
  status?: ServiceStatus;
  isFavorite?: boolean;
};

export type CardProps = {
  service: Service;
  width: number;
  onPress?: (service: Service) => void;
  onToggleFavorite?: (id: string) => void;
};
