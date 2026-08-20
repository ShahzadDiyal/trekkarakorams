import React from 'react';
import { CustomTrekModal } from '@/components/CustomTrekModal';

interface CustomPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomPlanModal: React.FC<CustomPlanModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return <CustomTrekModal onClose={onClose} />;
};
