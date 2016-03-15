class Track
  @@client = lambda {
    client = Elasticsearch::Client.new(log: false)
    client.transport.reload_connections!
    client.cluster.health
    client
  }.call

  class << self
    protected :new

    def search(body)
      @@client.search(index: 'pickfm', body: body)
    end

    def search_in_episode(program_id, episode_no, episode_type)
      @@client.search(index: 'pickfm',
                    body: {
                        filter: {
                            and: [
                                { term: { program_id: program_id } },
                                { term: { episode_no: episode_no } },
                                { term: { episode_type: episode_type } }
                            ]
                        },
                        sort: 'start_time',
                        size: 100
                    })
    end
  end
end
