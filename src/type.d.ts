type PlainObject = { [P: string]: any };

type LoginInfo = {
	id: string;
}

interface RootState {
	loginInfo: LoginInfo;
	modal: { visible: boolean };
	msgInfo: { visible: boolean; isError: boolean; txt: string; };
}

type User = {
	id: number;
	name: string;
};

interface UserState {
	list: User[];
}

type ResData<T> = {
	code: number;
	data?: T;
	msg?: string;
}

interface AxiosFn {
	(url: string, param?: any): Promise<ResData<any>>
}

type FileEvent = Event & {
	target: {
		files: FileList;
	};
};

export {
	PlainObject,
	ResData,
	AxiosFn,
	RootState,
	UserState,
	User,
}