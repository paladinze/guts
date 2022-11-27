interface HasId {
  id: number;
}


export class Sync<T extends HasId> {
  constructor(public endpoint: string) {
  }

  fetch(id: number): Promise<T> {
    return fetch(`${this.endpoint}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => {
      return r.json();
    });
  }

  save(payload: T): Promise<Response> {
    const { id } = payload;
    return fetch(`${this.endpoint}/${id}`, {
      method: !!id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }
}
