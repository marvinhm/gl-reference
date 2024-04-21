

export interface PersonalInfo {
  first_name: string;
  last_name: string;
  current_address: string;
};

export interface EmployerInfo {
  name: string;
  start_date: string;
  end_date: string;
};

export interface GuarantorInfo {
  name: string;
  address: string;
  relation: string
};

export interface TenantType {
  personal: PersonalInfo;
  employer: EmployerInfo[];
}