import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

export function Button({ children, style, ...rest }) {
  return (
    <TouchableOpacity 
      style={[styles.submitButton, style]}
      {...rest}
    >
        {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    submitButton: {
    backgroundColor: '#ED145B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24
    },

    submitButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    buttonPrimary: {
        backgroundColor: colors.primary,
    },
    buttonSecondary: {
        backgroundColor: colors.secondary,
    }

});