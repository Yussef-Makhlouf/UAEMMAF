declare module 'react-phone-input-2' {
  import { Component } from 'react';
  
  interface PhoneInputProps {
    country?: string;
    value?: string;
    onChange?: (phone: string) => void;
    inputClass?: string;
    buttonClass?: string;
    dropdownClass?: string;
    searchClass?: string;
    containerClass?: string;
    inputProps?: {
      name?: string;
      required?: boolean;
      id?: string;
    };
  }

  export default class PhoneInput extends Component<PhoneInputProps> {}
} 