//Icones
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';

const sitemap = [
    {
        name: 'home',
        label: 'Início',
        to: '/',
        icon: HomeIcon
        // roles: ['Intranet'],
    },
    {
        name: 'profile',
        label: 'Perfil',
        to: '/',
        icon: PersonIcon
        // roles: ['Intranet'],
    },
    {
        name: 'notifications',
        label: 'Notificações',
        to: '/',
        icon: NotificationsIcon
        // roles: ['Intranet'],
    },
    {
        name: 'settings',
        label: 'Configurações',
        icon: SettingsIcon,
        items: [
            {
                name: 'users',
                label: 'Users',
                to: '/Administrator/Users',
            },
            {
                name: 'roles',
                label: 'Roles',
                to: '/Administrator/Roles',
            },
        ]
    },
];

export default sitemap;