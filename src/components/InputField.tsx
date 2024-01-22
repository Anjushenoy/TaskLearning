import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const InputField = ({
  label,
  control,
  rules = {},
  name,
  password,
  defaultValue,
  ...props
}: InputFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <>
            <View style={styles.inputWrapper}>
              <TextInput
                secureTextEntry={password ? true : false}
                style={styles.inputText}
                {...props}
                onChangeText={onChange}
                value={value}
              />
            </View>
            {error && (
              <Text style={styles.errorMsg}>{error.message || 'Error'}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#009387',
  },
  inputWrapper: {
    height: 50,
    paddingRight: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#009387',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    textDecorationLine: 'none',
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginTop: 7,
  },
});
