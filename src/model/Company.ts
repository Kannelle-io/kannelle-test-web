import { Role } from '../core/rule/Roles';
import { DASHBOARD_RULE } from '../core/rule/Rules';
import { APIModelCharter } from '../services/api/types/ChartersServiceTypes';
import { APIModelCompany } from '../services/api/types/CompaniesServiceTypes';

export default class Company {
  private readonly _createdAt: string;
  private readonly _id: number;
  private readonly _isActive: boolean;
  private readonly _name: string;
  private _charters: APIModelCharter[];
  private _created: boolean;

  constructor(apiCompany: APIModelCompany) {
    this._createdAt = apiCompany.createdAt;
    this._id = apiCompany.id;
    this._isActive = apiCompany.isActive;
    this._name = apiCompany.name;
    this._charters = this.getAllowedCharters(apiCompany.charters);
    this._created = false;
  }

  getCompanyAllowedCharters = (): APIModelCharter[] => {
    return this.getAllowedCharters(this.charters);
  };

  private getAllowedCharters = (charters: APIModelCharter[]): APIModelCharter[] => {
    return charters.filter((charter) => {
      if (!charter.currentUser.role || !charter.currentUser.isActive) {
        return false;
      }

      const role = new Role(charter.currentUser.role);
      return role.isAllowedTo(DASHBOARD_RULE.VISIT);
    });
  };

  get id(): number {
    return this._id;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get name(): string {
    return this._name;
  }

  get charters(): APIModelCharter[] {
    return this._charters;
  }

  set charters(charters: APIModelCharter[]) {
    this._charters = charters;
  }

  get created(): boolean {
    return this._created;
  }

  set created(created: boolean) {
    this._created = created;
  }

  isValid(): boolean {
    return this.isActive && (this.charters.length > 0 || this.created);
  }

  toJsonModel(): APIModelCompany {
    return {
      createdAt: this._createdAt,
      id: this._id,
      isActive: this._isActive,
      name: this._name,
      charters: this._charters,
    };
  }
}
