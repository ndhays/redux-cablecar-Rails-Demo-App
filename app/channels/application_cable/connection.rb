module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      sleep 1
      self.current_user = get_current_user
    end

    private
      def get_current_user
        # Check if name is already used
        if cookies.signed[:name]
          cookies.signed[:name]
        else
          reject_unauthorized_connection
        end
      end
  end
end
