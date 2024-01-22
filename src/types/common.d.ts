type Navigation = NativeStackScreenProps<RootStackParamList>; // navigation purpose

type InputFieldProps = {   
    name: string;
    label: string;
    placeholder?: string;
    defaultValue?: string;
    password?: boolean;
    control: Control<FieldValues>;
    rules?: object;
    keyboardType?: KeyboardTypeOptions;
    editable?: boolean;
  };  //input props 

  type GlobalState = {
    users: User[];
    isLoggedIn: boolean;
    user: any;
  };
  type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_name: string;
  };
 
 
  type SignInData = FieldValues & {
    email: string;
    password: string;
  };
  type SignUpData = FieldValues & {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_name: string;
  };
  type UpdateFormData = FieldValues & {
    user_name : string
  };
  


  type DrawerProps = {
    user?: User;
    navigation: Navigation;
    children: ReactNode;
       
  }