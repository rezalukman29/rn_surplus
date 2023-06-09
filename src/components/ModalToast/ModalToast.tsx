/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  Modal, Platform, SafeAreaView, StatusBar, View,
} from 'react-native';
import styled from 'styled-components';
import colors from '../../styles/colors';
import useTheme from '../../theme/useTheme';

import { Text } from '../Text';

const ModalContainerStyled = styled(View)<{ bgColor: string }>`
  align-items: center;
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: row;
  height: 56px;
  padding: 0px 20px;
`;

type ModalToastType = 'success' | 'error' | 'warning';

interface ModalToastProps {
  isVisible: boolean;
  message: string;
  type: ModalToastType;
  onCloseModal: () => void;
  isKeepOpen?: boolean;
}

export function ModalToast({
  isVisible,
  message,
  type,
  onCloseModal,
}: ModalToastProps) {
  const theme = useTheme();
  const modalBackgroundMapper: Record<ModalToastType, string> = {
    success: theme?.colors.PRIMARY,
    error: colors.statusCanceled,
    warning: colors.statusCanceled,
  };

  return (
    <>
      <StatusBar
        barStyle={theme?.isLightTheme ? 'dark-content' : 'light-content'}
        backgroundColor={
          isVisible ? modalBackgroundMapper[type] : theme?.colors.BACKGROUND1
        }
      />
      <Modal
        transparent
        visible={isVisible}
        onShow={() => {
          setTimeout(() => {
            onCloseModal();
          }, 2000);
        }}
      >
        {Platform.OS === 'ios' && (
          <SafeAreaView
            style={{ flex: 0, backgroundColor: modalBackgroundMapper[type] }}
          />
        )}
        <SafeAreaView style={{ flex: 1 }}>
          <ModalContainerStyled bgColor={modalBackgroundMapper[type]}>
            <View style={{ marginLeft: 12 }}>
              <Text
                color={colors.white}
                label={message}
                fontWeight="semi-bold"
              />
            </View>
          </ModalContainerStyled>
        </SafeAreaView>
      </Modal>
    </>
  );
}
